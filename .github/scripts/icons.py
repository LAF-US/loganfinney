"""Make the site's raster icons from favicon.svg, in _config.yml's palette.

Writes favicon.ico (16, 32 and 48 pixels, on a clear background) and the PNG
icons (on the palette's white) beside favicon.svg. They are made fresh on every
build and never committed. Needs resvg-py, Pillow and ruamel.yaml.
"""

import io
import re
from pathlib import Path

import resvg_py
from PIL import Image
from ruamel.yaml import YAML

# Each PNG icon, its size, and the share of that size the outline's height takes
PNGS = {
    "apple-touch-icon.png": (180, 0.84),
    "icon-192.png": (192, 0.8),
    "icon-512.png": (512, 0.8),
}

root = Path(__file__).resolve().parents[2]
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
