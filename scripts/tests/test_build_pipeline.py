"""
test_build_pipeline.py

Integration test for the full build pipeline.
Verifies that build_report.py completes successfully and
produces the expected output artifacts.
"""

import sys
import subprocess
from pathlib import Path

TESTS_DIR = Path(__file__).resolve().parent
SCRIPTS_DIR = TESTS_DIR.parent
ROOT_DIR = SCRIPTS_DIR.parent


def test_build_pipeline_produces_html():
    """Run the full build pipeline and verify the single-file HTML is written to disk."""
    build_script = SCRIPTS_DIR / "build_report.py"

    result = subprocess.run(
        [sys.executable, str(build_script)],
        capture_output=True,
        text=True
    )

    assert result.returncode == 0, (
        f"build_report.py failed.\n\nSTDOUT:\n{result.stdout}\n\nSTDERR:\n{result.stderr}"
    )

    html_path = ROOT_DIR / "generated" / "engineering-leverage-report.html"
    assert html_path.exists(), f"Expected HTML not found at: {html_path}"
    assert html_path.stat().st_size > 0, "HTML file exists but is empty."
