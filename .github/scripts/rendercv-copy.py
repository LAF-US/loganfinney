"""Swap in LAF-US's copy of RenderCV if the regular one can't read cv.yaml.

The copy is RenderCV 2.8 plus two changes sent to RenderCV but not yet in a
release: IMDb IDs longer than seven digits, and 20 more social networks. While
cv.yaml uses neither, the regular RenderCV reads it and the copy goes unused.
Once a regular release reads cv.yaml (Dependabot proposes each one in
.github/requirements.txt), the copy goes unused again for good, and this script
and the workflow steps that run it can be removed.

The copy only adds to 2.8, so it stands in only for 2.8. Any other RenderCV
that can't read cv.yaml fails the build instead of being quietly swapped for
2.8. To use that version with the copy's changes, rebuild the copy on it and
update COPY and BASE.

Usage: python3 .github/scripts/rendercv-copy.py, after installing
.github/requirements.txt
"""

import subprocess
import sys
import tempfile
from importlib.metadata import version
from pathlib import Path

# https://github.com/LAF-US/rendercv/tree/site, pinned to a full commit ID so
# what it installs can't change
COPY = "git+https://github.com/LAF-US/rendercv@1d594aac895af256d6f7a5b2b8bc9ccc2bc498e2"
# The release the copy is built on
BASE = "2.8"
# The tool that builds the copy from source (its pyproject.toml asks for
# uv_build>=0.10.3,<0.11.0), pinned to the last 0.10 release, from 2026-03-19
BUILD_TOOL = "uv_build==0.10.12"

cv = Path(__file__).resolve().parents[2] / "cv.yaml"
with tempfile.TemporaryDirectory() as folder:
    check = subprocess.run(
        ["rendercv", "render", str(cv), "-nopdf", "-nopng", "-o", folder],
        capture_output=True,
        text=True,
    )
regular = version("rendercv")
if check.returncode == 0:
    print(f"The regular RenderCV ({regular}) reads cv.yaml, so the build uses it")
elif regular != BASE:
    print(check.stdout, check.stderr, sep="\n")
    print(f"::error::RenderCV {regular} can't read cv.yaml, and LAF-US's copy is built on {BASE}, so it can't stand in. Fix cv.yaml, or rebuild the copy on {regular} and update COPY and BASE in .github/scripts/rendercv-copy.py")
    sys.exit(1)
else:
    print(f"::notice::The regular RenderCV ({regular}) can't read cv.yaml, so the build uses LAF-US's copy")
    print(check.stdout, check.stderr, sep="\n")
    with tempfile.NamedTemporaryFile("w", suffix=".txt") as constraint:
        constraint.write(f"{BUILD_TOOL}\n")
        constraint.flush()
        subprocess.run(
            [sys.executable, "-m", "pip", "install", "--no-deps", "--force-reinstall", "--build-constraint", constraint.name, f"rendercv @ {COPY}"],
            check=True,
        )
