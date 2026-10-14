"""Print the RenderCV options that set the PDF's colors and fonts from
_config.yml's palette and fonts, one per line.

Usage: options=$(python3 .github/scripts/rendercv-options.py) &&
       mapfile -t options <<< "$options" && rendercv render cv.yaml "${options[@]}"
"""

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

config = YAML(typ="safe").load((Path(__file__).resolve().parents[2] / "_config.yml").read_text())
for role, color in COLORS.items():
    print(f"--design.colors.{role}", config["palette"][color], sep="\n")
for role, font in FONTS.items():
    print(f"--design.typography.font_family.{role}", config["fonts"][font]["name"], sep="\n")
