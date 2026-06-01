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
    """Run the full build pipeline and verify a non-empty PDF is written to disk."""
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

    pdf_path = ROOT_DIR / "generated" / "engineering-leverage-report.pdf"
    assert pdf_path.exists(), f"Expected PDF not found at: {pdf_path}"
    assert pdf_path.stat().st_size > 0, "PDF file exists but is empty — likely a render failure."
