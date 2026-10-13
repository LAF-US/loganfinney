"""Make TTF copies of the site's fonts for RenderCV's PDF.

RenderCV's PDF engine (Typst) reads fonts from fonts/ beside cv.yaml but
cannot read WOFF2, the format the site serves. This writes a TTF beside each
WOFF2 the PDF uses. The TTFs are made fresh on every build and never
committed or published. Needs fontTools with WOFF2 support (pip install "fonttools[woff]").
"""

from pathlib import Path

from fontTools.ttLib import TTFont

fonts = Path(__file__).resolve().parent.parent / "fonts"
for name in [
    "dejavu-sans",
    "dejavu-sans-bold",
    "dejavu-sans-oblique",
    "cousine",
    "cousine-bold",
    "cousine-italic",
]:
    font = TTFont(fonts / f"{name}.woff2")
    font.flavor = None
    font.save(fonts / f"{name}.ttf")
    print(f"Wrote {fonts / name}.ttf")
