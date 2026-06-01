import subprocess
import sys
from pathlib import Path

SCRIPTS_DIR = Path(__file__).resolve().parent

def run_script(script_name):
    script_path = SCRIPTS_DIR / script_name
    python_exe = sys.executable
    
    print(f"\n--- Running {script_name} ---")
    result = subprocess.run([python_exe, str(script_path)], capture_output=False)
    
    if result.returncode != 0:
        print(f"✖ Script {script_name} failed with return code {result.returncode}")
        return False
    return True

def main():
    print("Starting Engineering Leverage Report Build Process...")
    
    # 1. Validate data structures
    if not run_script("validate_data.py"):
        print("Build failed at the validation phase.")
        sys.exit(1)
        
    # 2. Generate derived metrics
    if not run_script("generate_metrics.py"):
        print("Build failed at the metrics generation phase.")
        sys.exit(1)
        
    print("\n✓ Report build completed successfully!")
    sys.exit(0)

if __name__ == "__main__":
    main()
