import subprocess
import sys
import shutil
from pathlib import Path

SCRIPTS_DIR = Path(__file__).resolve().parent
ROOT_DIR = SCRIPTS_DIR.parent
WEB_DIR = ROOT_DIR / "web"
GENERATED_DIR = ROOT_DIR / "generated"

def run_script(script_name):
    script_path = SCRIPTS_DIR / script_name
    python_exe = sys.executable

    print(f"\n--- Running {script_name} ---")
    result = subprocess.run([python_exe, str(script_path)], capture_output=False)

    if result.returncode != 0:
        print(f"✖ Script {script_name} failed with return code {result.returncode}")
        return False
    return True

def build_frontend():
    print("\n--- Building frontend (npm run build) ---")
    result = subprocess.run(["npm", "run", "build"], cwd=str(WEB_DIR), capture_output=False)
    if result.returncode != 0:
        print("✖ Frontend build failed.")
        return False
    # Copy self-contained HTML to generated/
    src = WEB_DIR / "dist" / "index.html"
    GENERATED_DIR.mkdir(parents=True, exist_ok=True)
    shutil.copy(src, GENERATED_DIR / "engineering-leverage-report.html")
    print("✓ Single-file HTML saved to generated/engineering-leverage-report.html")
    return True

def main():
    print("Starting Engineering Leverage Report Build Process...")

    if not run_script("validate_data.py"):
        print("Build failed at the validation phase.")
        sys.exit(1)

    if not run_script("generate_metrics.py"):
        print("Build failed at the metrics generation phase.")
        sys.exit(1)

    if not build_frontend():
        print("Build failed at the frontend build phase.")
        sys.exit(1)

    if not run_script("export_pdf.py"):
        print("Build failed at the PDF generation phase.")
        sys.exit(1)

    print("\n✓ Report build completed successfully!")
    sys.exit(0)

if __name__ == "__main__":
    main()
