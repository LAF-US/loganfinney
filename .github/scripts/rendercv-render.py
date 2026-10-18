"""Render cv.yaml with RenderCV, with what the site sets in _config.yml.

Passes RenderCV the PDF's colors and fonts from _config.yml's palette and
fonts, and the CV's email and website from contact.email and url. cv.yaml
leaves those two empty, so they keep their place in the PDF's header. Writes
cv.html and cv.md to FOLDER, and the PDF to cv.pdf at the site root. Any
further options go to RenderCV as given.

Usage: python3 .github/scripts/rendercv-render.py FOLDER [RenderCV options]
"""

import subprocess
import sys
from pathlib import Path

from ruamel.yaml import YAML

# Each RenderCV color and the palette color it takes
COLORS = {
    "body": "grey-dark",
    "name": "black",
    "headline": "black",
    "connections": "grey-dark",
    "section_titles": "black",
    "links": "green-dark",
    "footer": "grey-dark",
    "top_note": "grey-dark",
}

# Each RenderCV font and the site typeface it takes
FONTS = {
    "body": "sans",
    "name": "sans",
    "headline": "sans",
    "connections": "mono",
    "section_titles": "sans",
}

root = Path(__file__).resolve().parents[2]
# RenderCV reads relative paths from cv.yaml's folder, so these are absolute
folder = Path(sys.argv[1]).resolve()
config = YAML(typ="safe").load((root / "_config.yml").read_text())

options = ["--cv.email", config["contact"]["email"], "--cv.website", config["url"]]
for role, color in COLORS.items():
    options += [f"--design.colors.{role}", config["palette"][color]]
for role, font in FONTS.items():
    options += [f"--design.typography.font_family.{role}", config["fonts"][font]["name"]]

subprocess.run(
    [
        "rendercv", "render", str(root / "cv.yaml"), *options,
        "--output-folder", str(folder),
        "--html-path", str(folder / "cv.html"),
        "--markdown-path", str(folder / "cv.md"),
        "--pdf-path", str(root / "cv.pdf"),
        "-nopng",
        *sys.argv[2:],
    ],
    check=True,
)
