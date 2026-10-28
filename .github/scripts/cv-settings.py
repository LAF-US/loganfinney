"""Copy the site's facts from cv.yaml into _config.cv.yml for Jekyll.

Your name, job title, bio, email, website, location, profiles and other
contacts are typed in cv.yaml only. This writes them under the setting names
Jekyll's SEO plugin and the templates read, and the site build loads the file
after _config.yml:

    bundle exec jekyll build --config _config.yml,_config.cv.yml

The site needs your name and website. Anything else cv.yaml leaves out, the
pages leave out too. The bio is the text of the section titled Summary, and
the site's fediverse address (.well-known/webfinger) and the author credit on
Mastodon's link previews are the Mastodon profile. The site's Nostr address
(.well-known/nostr.json) is the Nostr key, written as an npub, in a custom
connection's address.
Where cv.yaml gives more than one email or website, the site uses the first.
The contact line, logan.vcf and security.txt take Signal and WhatsApp from the
custom connections with the signal-messenger and whatsapp icons.

The memberships trust.txt lists are the links in the Professional Memberships
section, for the ones with no end date or an end date of present.

The rel="me" links are every profile and custom connection. The profile links
come from RenderCV's own model, which builds each address from its network
and username, so they match the links in the CV. The file is made fresh on
every build and never committed; run this before building the site locally.
Needs RenderCV, which brings ruamel.yaml.
"""

import re
import sys
from pathlib import Path

from rendercv.schema.rendercv_model_builder import build_rendercv_dictionary_and_model
from ruamel.yaml import YAML

root = Path(__file__).resolve().parents[2]
cv_file = root / "cv.yaml"
typed, model = build_rendercv_dictionary_and_model(cv_file.read_text(encoding="utf-8"), input_file_path=cv_file)
cv = typed["cv"]

missing = [fact for fact in ("name", "website") if not cv.get(fact)]
if missing:
    sys.exit(f"cv.yaml needs {' and '.join(missing)} under cv: the site's title is your name, and its address is your website")


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
    file.write("# Made from cv.yaml by .github/scripts/cv-settings.py. Edit cv.yaml, not this\n")
    yaml = YAML()
    # Each setting on one line, however long
    yaml.width = 4096
    yaml.dump(settings, file)
print(f"Wrote {target}")
