"""Copy the site's facts from cv.yaml into _config.cv.yml for Jekyll.

Your name, job title, bio, email, website, location and profiles are typed in
cv.yaml only. This writes them under the setting names Jekyll's SEO plugin and
the templates read, and the site build loads the file after _config.yml:

    bundle exec jekyll build --config _config.yml,_config.cv.yml

The profile links come from RenderCV's own model, which builds each address
from its network and username, so they match the links in the CV. The file is
made fresh on every build and never committed; run this before building the
site locally. Needs RenderCV, which brings ruamel.yaml.
"""

from pathlib import Path

from rendercv.schema.rendercv_model_builder import build_rendercv_dictionary_and_model
from ruamel.yaml import YAML

root = Path(__file__).resolve().parents[2]
cv_file = root / "cv.yaml"
typed, model = build_rendercv_dictionary_and_model(cv_file.read_text(), input_file_path=cv_file)
cv = typed["cv"]
profiles = model.cv.social_networks
mastodon = next(profile.username for profile in profiles if profile.network == "Mastodon")

settings = {
    "title": cv["name"],
    "tagline": cv["headline"],
    "description": " ".join(cv["sections"]["Summary"]),
    "url": cv["website"].rstrip("/"),
    "location": cv["location"],
    "author": {"name": cv["name"]},
    "contact": {"email": cv["email"]},
    "social": {"links": [profile.url for profile in profiles]},
    # The fediverse account a search for anything@ the site's domain finds
    # (.well-known/webfinger), without the username's leading @
    "mastodon": mastodon.lstrip("@"),
}

target = root / "_config.cv.yml"
with target.open("w") as file:
    file.write("# Made from cv.yaml by .github/scripts/cv-settings.py. Edit cv.yaml, not this\n")
    yaml = YAML()
    # Each setting on one line, however long
    yaml.width = 4096
    yaml.dump(settings, file)
print(f"Wrote {target}")
