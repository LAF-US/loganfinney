"""Copy the site's facts from cv.yaml into _config.cv.yml for Jekyll.

Your name, job title, bio, email, website, location, profiles and other
contacts are typed in cv.yaml only. This writes them under the setting names
Jekyll's SEO plugin and the templates read, and the site build loads the file
after _config.yml:

    bundle exec jekyll build --config _config.yml,_config.cv.yml

The site needs your name and website. Anything else cv.yaml leaves out, the
pages leave out too. The bio is the text of the section titled Summary, and
the site's fediverse address (.well-known/webfinger) is the Mastodon profile.
Where cv.yaml gives more than one email or website, the site uses the first.
The contact line, logan.vcf and security.txt take Signal and WhatsApp from the
custom connections with the signal-messenger and whatsapp icons.

The rel="me" links are every profile and custom connection. The profile links
come from RenderCV's own model, which builds each address from its network
and username, so they match the links in the CV. The file is made fresh on
every build and never committed; run this before building the site locally.
Needs RenderCV, which brings ruamel.yaml.
"""

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

target = root / "_config.cv.yml"
with target.open("w", encoding="utf-8") as file:
    file.write("# Made from cv.yaml by .github/scripts/cv-settings.py. Edit cv.yaml, not this\n")
    yaml = YAML()
    # Each setting on one line, however long
    yaml.width = 4096
    yaml.dump(settings, file)
print(f"Wrote {target}")
