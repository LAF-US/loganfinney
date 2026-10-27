"""Check that every photo in images/hero/ has a caption and a description in
hero.js, and that every entry there has its photo.

hero.js shows a photo with no entry with no caption and an empty description,
so a screen reader would skip it. Stops the build, naming each problem.
"""

import re
import sys
from pathlib import Path

root = Path(__file__).resolve().parents[2]
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
