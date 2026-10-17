"""Swap in LAF-US's copy of RenderCV if the regular one can't read cv.yaml.

The copy is RenderCV 2.8 plus two changes sent to RenderCV but not yet in a
release: IMDb IDs longer than seven digits, and 20 more social networks. While
cv.yaml uses neither, the regular RenderCV reads it and the copy goes unused.
Once a regular release reads cv.yaml (Dependabot proposes each one in
.github/requirements.txt), the copy goes unused again for good, and this script
and the workflow steps that run it can be removed.

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

cv = Path(__file__).resolve().parents[2] / "cv.yaml"
with tempfile.TemporaryDirectory() as folder:
    check = subprocess.run(
        ["rendercv", "render", str(cv), "-nopdf", "-nopng", "-o", folder],
        capture_output=True,
        text=True,
    )
if check.returncode == 0:
    print(f"The regular RenderCV ({version('rendercv')}) reads cv.yaml, so the build uses it")
else:
    print(f"::notice::The regular RenderCV ({version('rendercv')}) can't read cv.yaml, so the build uses LAF-US's copy")
    print(check.stdout, check.stderr, sep="\n")
    subprocess.run([sys.executable, "-m", "pip", "install", "--no-deps", "--force-reinstall", f"rendercv @ {COPY}"], check=True)
