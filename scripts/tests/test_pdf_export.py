"""
test_pdf_export.py

End-to-end tests for the PDF export pipeline.
These are intentionally separated from test_data_validation.py.

If a test in test_data_validation.py fails, you know it's a data or schema issue.
If a test here fails, you know the problem is in one of:
  - export_pdf.py (Playwright / server / browser)
  - build_report.py orchestration
  - filesystem permissions on /generated

Keep these concerns separate.
"""

import sys
import pytest
from pathlib import Path

TESTS_DIR = Path(__file__).resolve().parent
SCRIPTS_DIR = TESTS_DIR.parent
ROOT_DIR = SCRIPTS_DIR.parent


def test_pdf_is_generated_by_build_pipeline():
    """Run the full build pipeline and verify a non-empty PDF and WebP are written to disk."""
    import subprocess
    build_script = SCRIPTS_DIR / "build_report.py"

    result = subprocess.run(
        [sys.executable, str(build_script)],
        capture_output=True,
        text=True
    )

    assert result.returncode == 0, (
        f"build_report.py failed.\n\nSTDOUT:\n{result.stdout}\n\nSTDERR:\n{result.stderr}"
    )

    generated = ROOT_DIR / "generated"

    pdf_path = generated / "engineering-leverage-report.pdf"
    assert pdf_path.exists(), f"Expected PDF not found at: {pdf_path}"
    assert pdf_path.stat().st_size > 0, "PDF file exists but is empty."

    webp_path = generated / "engineering-leverage-report.webp"
    assert webp_path.exists(), f"Expected WebP not found at: {webp_path}"
    assert webp_path.stat().st_size > 0, "WebP file exists but is empty."

    html_path = generated / "engineering-leverage-report.html"
    assert html_path.exists(), f"Expected single-file HTML not found at: {html_path}"
    assert html_path.stat().st_size > 0, "HTML file exists but is empty."
