import json
import sys
from pathlib import Path

# Resolve directories using pathlib
SCRIPTS_DIR = Path(__file__).resolve().parent
ROOT_DIR = SCRIPTS_DIR.parent
DATA_DIR = ROOT_DIR / "data"
GENERATED_DIR = ROOT_DIR / "generated"

def load_json(filepath):
    if not filepath.exists():
        return []
    with open(filepath, "r") as f:
        return json.load(f)

def compute_metrics(events, projects):
    categories = {}
    for event in events:
        cat = event.get("category", "Unknown")
        categories[cat] = categories.get(cat, 0) + 1

    tech_stack = {}
    for project in projects:
        for tech in project.get("technologies", []):
            tech_stack[tech] = tech_stack.get(tech, 0) + 1

    return {
        "summary": {
            "total_leverage_events": len(events),
            "total_projects": len(projects),
            "unique_categories_count": len(categories),
            "unique_technologies_count": len(tech_stack),
        },
        "categories": categories,
        "technologies": tech_stack,
    }

def main():
    print("Generating derived metrics...")

    events   = load_json(DATA_DIR / "leverage-events.json")
    projects = load_json(DATA_DIR / "projects.json")

    derived_metrics = compute_metrics(events, projects)

    GENERATED_DIR.mkdir(parents=True, exist_ok=True)
    output_path = GENERATED_DIR / "metrics-derived.json"
    with open(output_path, "w") as f:
        json.dump(derived_metrics, f, indent=2)

    print(f"✓ Derived metrics generated and written to {output_path}")
    sys.exit(0)

if __name__ == "__main__":
    main()
