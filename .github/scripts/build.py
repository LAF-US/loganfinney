"""Build loganfinney.com from cv.yaml: everything between installing the tools
and testing the finished site. The workflow (.github/workflows/jekyll-gh-pages.yml)
runs it as one step; run it yourself the same way to build the site locally:

    python3 .github/scripts/build.py

In order, it:

1. renders the CV from cv.yaml with RenderCV
2. copies the site's facts from cv.yaml into _config.cv.yml for Jekyll
3. on the daily run only, checks whether the CV changed since the live site
   was built
4. checks every hero photo has a caption and a description in hero.js
5. draws the favicon and app icons from favicon.svg
6. puts the CV on the site, and its PDF at /cv.pdf
7. builds the site with Jekyll, and adds RenderCV's output to it as it is
8. checks no file was published with its template code unbuilt

Any step that finds a problem stops the build with a plain message. Everything
it writes is made fresh on every build and never committed. Needs the Python
packages in .github/requirements.txt (RenderCV, which brings ruamel.yaml,
resvg-py and Pillow) and Ruby with the gems in Gemfile.lock.
"""

import io
import os
import re
import shutil
import subprocess
import sys
import urllib.request
from pathlib import Path

import resvg_py
from PIL import Image
from rendercv.schema.rendercv_model_builder import build_rendercv_dictionary_and_model
from ruamel.yaml import YAML

root = Path(__file__).resolve().parents[2]
output = root / "rendercv_output"


def first(fact):
    """The fact, or the first of several"""
    return fact[0] if isinstance(fact, list) else fact


BECH32 = "qpzry9x8gf2tvdw0s3jn54khce6mua7l"


def npub_to_hex(npub):
    """A Nostr key written as an npub (NIP-19's bech32), in the lowercase hex
    NIP-05 asks for. Stops the build if the key is the wrong length or its
    checksum doesn't match, as with a typo"""
    data = [BECH32.index(char) for char in npub[len("npub1"):]]
    check = 1
    for value in [ord(char) >> 5 for char in "npub"] + [0] + [ord(char) & 31 for char in "npub"] + data:
        top = check >> 25
        check = (check & 0x1FFFFFF) << 5 ^ value
        for bit, generator in enumerate((0x3B6A57B2, 0x26508E6D, 0x1EA119FA, 0x3D4233DD, 0x2A1462B3)):
            if top >> bit & 1:
                check ^= generator
    # A key is 32 bytes: 52 five-bit letters before the 6-letter checksum
    if check != 1 or len(data) != 58:
        sys.exit(f"The Nostr key {npub} in cv.yaml has a typo: it isn't a whole, valid npub")
    bits = "".join(f"{value:05b}" for value in data[:-6])
    return "".join(f"{int(bits[start:start + 8], 2):02x}" for start in range(0, 256, 8))


def run(name, *command):
    """Runs a tool in the repository's folder; if it fails, stops the build
    under its message"""
    if subprocess.run(command, cwd=root).returncode:
        sys.exit(f"\n{name} stopped the build; its message is above")


def render_cv():
    """RenderCV writes the CV's PDF, HTML, Markdown, Typst source and page
    images to rendercv_output/, as cv.yaml's settings ask"""
    run("RenderCV", sys.executable, "-m", "rendercv", "render", "cv.yaml")


def copy_facts():
    """Copy the site's facts from cv.yaml into _config.cv.yml for Jekyll.

    Your name, job title, bio, email, website, location, profiles and other
    contacts are typed in cv.yaml only. This writes them under the setting
    names Jekyll's SEO plugin and the templates read, and Jekyll loads the file
    after _config.yml. The site needs your name and website. Anything else
    cv.yaml leaves out, the pages leave out too. The bio is the text of the
    section titled Summary, and the site's fediverse address
    (.well-known/webfinger) and the author credit on Mastodon's link previews
    are the Mastodon profile. The site's Nostr address (.well-known/nostr.json)
    is the Nostr key, written as an npub, in a custom connection's address.
    Where cv.yaml gives more than one email or website, the site uses the first.
    The contact line, logan.vcf and security.txt take Signal and WhatsApp from
    the custom connections with the signal-messenger and whatsapp icons.

    The memberships trust.txt lists are the links in the Professional
    Memberships section, for the ones with no end date or an end date of present.

    The rel="me" links are every profile and custom connection. The profile
    links come from RenderCV's own model, which builds each address from its
    network and username, so they match the links in the CV."""
    cv_file = root / "cv.yaml"
    typed, model = build_rendercv_dictionary_and_model(cv_file.read_text(encoding="utf-8"), input_file_path=cv_file)
    cv = typed["cv"]

    missing = [fact for fact in ("name", "website") if not cv.get(fact)]
    if missing:
        sys.exit(f"cv.yaml needs {' and '.join(missing)} under cv: the site's title is your name, and its address is your website")

    settings = {
        "title": cv["name"],
        "url": first(cv["website"]).rstrip("/"),
        "author": {"name": cv["name"]},
    }
    if cv.get("headline"):
        settings["tagline"] = cv["headline"]
    summary = [text for text in (cv.get("sections") or {}).get("Summary", []) if isinstance(text, str)]
    if summary:
        settings["description"] = " ".join(summary)
    if cv.get("location"):
        settings["location"] = cv["location"]
    # The CV's photo, also shown beside your name on the home page
    if cv.get("photo"):
        settings["photo"] = str(cv["photo"])
    connections = cv.get("custom_connections") or []
    contact = {}
    if cv.get("email"):
        contact["email"] = first(cv["email"])
    apps = {"signal-messenger": "signal", "whatsapp": "whatsapp"}
    for connection in connections:
        app = apps.get(connection.get("fontawesome_icon"))
        if app and app not in contact and connection.get("url"):
            contact[app] = {"handle": connection["placeholder"], "url": connection["url"]}
    if contact:
        settings["contact"] = contact
    profiles = model.cv.social_networks or []
    links = [profile.url for profile in profiles] + [connection["url"] for connection in connections if connection.get("url")]
    if links:
        settings["social"] = {"links": links}
    mastodon = next((profile.username for profile in profiles if profile.network == "Mastodon"), None)
    if mastodon:
        # The fediverse account a search for anything@ the site's domain finds,
        # without the username's leading @
        settings["mastodon"] = mastodon.lstrip("@")
    # The Nostr key, written as an npub, in a custom connection's address, for
    # .well-known/nostr.json
    for connection in connections:
        npub = re.search(r"npub1[02-9ac-hj-np-z]+", str(connection.get("url", "")))
        if npub:
            settings["nostr"] = npub_to_hex(npub.group(0))
            break
    # Each name is a Markdown link, [Name](address); a name without one is skipped
    memberships = []
    for entry in (cv.get("sections") or {}).get("Professional Memberships", []):
        # An entry can be plain text: then it is the name, with no end date
        if isinstance(entry, str):
            entry = {"name": entry}
        link = re.search(r"\]\((\S+?)\)", str(entry.get("name", "")))
        if link and str(entry.get("end_date", "present")) == "present":
            memberships.append(link.group(1))
    if memberships:
        settings["memberships"] = memberships

    target = root / "_config.cv.yml"
    with target.open("w", encoding="utf-8") as file:
        file.write("# Made from cv.yaml by .github/scripts/build.py. Edit cv.yaml, not this\n")
        yaml = YAML()
        # Each setting on one line, however long
        yaml.width = 4096
        yaml.dump(settings, file)
    print(f"Wrote {target}")
    # The site's address, for the workflow's later steps and jobs
    workflow_output("site", settings["url"])
    return settings["url"]


def check_cv_changed(site):
    """The daily run publishes only if the CV's text differs from the live
    site's copy, through an edit or a date rolling over. The PDF's text is
    compared through its Typst source, because the PDF file carries the day it
    was made. A live copy that can't be fetched counts as a change"""
    changed = False
    for file in sorted([*output.glob("*.md"), *output.glob("*.typ")]):
        try:
            with urllib.request.urlopen(f"{site}/rendercv_output/{file.name}", timeout=60) as response:
                changed |= response.read() != file.read_bytes()
        except OSError:
            changed = True
    print(f"The CV changed since the live site was built: {str(changed).lower()}")
    workflow_output("changed", str(changed).lower())


def check_hero_photos():
    """Every photo in images/hero/ needs a caption and a description in
    hero.js, and every entry there needs its photo. hero.js shows a photo with
    no entry with no caption and an empty description, so a screen reader
    would skip it. Names each problem"""
    # Jekyll leaves files whose names start with "." (such as .DS_Store) off the site
    photos = {path.name for path in (root / "images/hero").iterdir() if path.is_file() and not path.name.startswith(".")}
    # Each entry is 'file name': { caption: '...', alt: '...' }
    entries = dict(re.findall(r"'([^']+)':\s*\{([^}]*)\}", (root / "hero.js").read_text(encoding="utf-8")))

    problems = [f"images/hero/{name} has no entry in hero.js" for name in sorted(photos - entries.keys())]
    problems += [f"hero.js has an entry for {name}, but images/hero/ has no such photo" for name in sorted(entries.keys() - photos)]
    for name in sorted(photos & entries.keys()):
        for field in ("caption", "alt"):
            if not re.search(rf"""\b{field}:\s*(['"])(?!\1).+?\1""", entries[name]):
                problems.append(f"hero.js's entry for {name} has no {field}")

    for problem in problems:
        print(f"::error::{problem}")
    if problems:
        sys.exit(1)
    print(f"All {len(photos)} hero photos have a caption and a description")


# Each PNG icon, its size, and the share of that size the outline's height takes
PNGS = {
    "apple-touch-icon.png": (180, 0.84),
    "icon-192.png": (192, 0.8),
    "icon-512.png": (512, 0.8),
}


def draw_icons():
    """favicon.ico (16, 32 and 48 pixels, on a clear background) and the PNG
    icons (on the palette's white), drawn from favicon.svg in _config.yml's
    palette, beside favicon.svg"""
    palette = YAML(typ="safe").load((root / "_config.yml").read_text())["palette"]
    svg = (root / "favicon.svg").read_text().split("---\n", 2)[2]
    svg = re.sub(r"\{\{ site\.palette\.([\w-]+) \}\}", lambda m: palette[m.group(1)], svg)

    def render(size):
        return Image.open(io.BytesIO(resvg_py.svg_to_bytes(svg_string=svg, width=size, height=size)))

    render(48).save(root / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    print(f"Wrote {root / 'favicon.ico'}")
    for name, (size, share) in PNGS.items():
        outline = render(round(size * share))
        icon = Image.new("RGB", (size, size), palette["white"])
        offset = (size - outline.width) // 2
        icon.paste(outline, (offset, offset), outline)
        icon.save(root / name)
        print(f"Wrote {root / name}")


def only(pattern):
    """The one file RenderCV wrote that matches the pattern"""
    found = sorted(output.glob(pattern))
    if len(found) != 1:
        sys.exit(f"Expected exactly one {pattern} from RenderCV in {output}, got: {[path.name for path in found]}")
    return found[0]


def include_cv():
    """Put RenderCV's own HTML and Markdown on the site, whole and unchanged:
    everything inside the HTML's <article class="markdown-body"> goes to
    _includes/rendercv.html, which index.html includes, and the Markdown beside
    it to _includes/rendercv.md, which index.md.txt and llms-full.txt include.
    The PDF goes to /cv.pdf"""
    source = only("*.html").read_text(encoding="utf-8")
    # RenderCV puts the CV inside <article class="markdown-body">
    article = re.search(r'<article class="markdown-body">(.*?)</article>', source, re.S)
    if not article:
        sys.exit("No <article class=\"markdown-body\"> in RenderCV's HTML")

    includes = root / "_includes"
    target = includes / "rendercv.html"
    target.write_text(
        "{%- comment -%} Generated by .github/scripts/build.py from RenderCV's "
        "HTML. Do not edit; edit cv.yaml and build again {%- endcomment %}\n"
        # raw: RenderCV's text is shown as written, never read as Liquid
        + "{% raw %}\n"
        + article.group(1).strip()
        + "\n{% endraw %}\n",
        encoding="utf-8",
    )
    print(f"Wrote {target}")

    target = includes / "rendercv.md"
    target.write_text(
        "{% raw %}" + only("*.md").read_text(encoding="utf-8").strip() + "{% endraw %}\n",
        encoding="utf-8",
    )
    print(f"Wrote {target}")

    shutil.copyfile(only("*.pdf"), root / "cv.pdf")
    print(f"Wrote {root / 'cv.pdf'}")


def build_site():
    """The github-pages gem builds the way GitHub Pages does; the second
    settings file carries the facts from cv.yaml. RenderCV's files are
    finished, so Jekyll doesn't read them (_config.yml's exclude list): they
    are copied in afterwards, unchanged"""
    os.environ.setdefault("JEKYLL_ENV", "production")
    run("Jekyll", "bundle", "exec", "jekyll", "build", "--config", "_config.yml,_config.cv.yml")
    shutil.copytree(output, root / "_site" / output.name)
    print(f"Copied {output} into the built site")


def check_unbuilt():
    """A file that lost its front matter (the two --- lines at its top) is
    copied as it is, with its {{ }} and {% %} code unbuilt"""
    found = subprocess.run(["grep", "-rlI", "-e", "{{", "-e", "{%", "_site"], cwd=root, capture_output=True, text=True)
    if found.stdout:
        print(f"::error::Unbuilt template code in: {' '.join(found.stdout.split())}")
        sys.exit(1)
    print("No file has its template code unbuilt")


def workflow_output(name, value):
    """Hands a value to the workflow's later steps and jobs; does nothing
    outside GitHub"""
    if os.environ.get("GITHUB_OUTPUT"):
        with open(os.environ["GITHUB_OUTPUT"], "a", encoding="utf-8") as file:
            file.write(f"{name}={value}\n")


def step(title):
    """A heading for each step's messages, in GitHub's log as on your screen"""
    print(f"\n== {title}", flush=True)


step("1. Render the CV from cv.yaml")
render_cv()
step("2. Copy the site's facts from cv.yaml for Jekyll (_config.cv.yml)")
site = copy_facts()
if os.environ.get("GITHUB_EVENT_NAME") == "schedule":
    step("3. Check whether the CV changed since the live site was built")
    check_cv_changed(site)
step("4. Check every hero photo has a caption and a description in hero.js")
check_hero_photos()
step("5. Draw the favicon and app icons from favicon.svg")
draw_icons()
step("6. Put the CV on the site, and its PDF at /cv.pdf")
include_cv()
step("7. Build the site with Jekyll, and add RenderCV's output to it")
build_site()
step("8. Check no file was published with its template code unbuilt")
check_unbuilt()
