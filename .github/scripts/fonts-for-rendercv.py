"""Make TTF copies of the site's fonts for RenderCV's PDF.

RenderCV's PDF engine (Typst) reads fonts from fonts/ beside cv.yaml but
cannot read WOFF2, the format the site serves. This writes a TTF beside each
WOFF2 listed in _config.yml's fonts. The TTFs are made fresh on every build and
never committed or published. Needs fontTools with WOFF2 support
(pip install "fonttools[woff]") and ruamel.yaml.
"""

from pathlib import Path

from fontTools.ttLib import TTFont
from ruamel.yaml import YAML

root = Path(__file__).resolve().parents[2]
config = YAML(typ="safe").load((root / "_config.yml").read_text())
for font in config["fonts"].values():
    for face in font["files"]:
        woff2 = root / "fonts" / face["file"]
        ttf = woff2.with_suffix(".ttf")
        font_file = TTFont(woff2)
        font_file.flavor = None
        font_file.save(ttf)
        print(f"Wrote {ttf}")
