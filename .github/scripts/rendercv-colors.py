"""Print the RenderCV options that color the PDF from _config.yml's palette.

Usage: rendercv render cv.yaml $(python3 .github/scripts/rendercv-colors.py)
"""

from pathlib import Path

from ruamel.yaml import YAML

# Each RenderCV color and the palette color it takes
ROLES = {
    "body": "grey-dark",
    "name": "black",
    "headline": "black",
    "connections": "grey-dark",
    "section_titles": "black",
    "links": "green-dark",
    "footer": "grey-dark",
    "top_note": "grey-dark",
}

config = Path(__file__).resolve().parents[2] / "_config.yml"
palette = YAML(typ="safe").load(config)["palette"]
print(" ".join(f"--design.colors.{role} {palette[color]}" for role, color in ROLES.items()))
