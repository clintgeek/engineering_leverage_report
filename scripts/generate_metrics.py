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

def main():
    print("Generating derived metrics...")
    
    events_path = DATA_DIR / "leverage-events.json"
    projects_path = DATA_DIR / "projects.json"
    
    events = load_json(events_path)
    projects = load_json(projects_path)
    
    # Calculate events by category
    categories = {}
    for event in events:
        cat = event.get("category", "Unknown")
        categories[cat] = categories.get(cat, 0) + 1
        
    # Calculate tech stack frequencies
    tech_stack = {}
    for project in projects:
        techs = project.get("technologies", [])
        for tech in techs:
            tech_stack[tech] = tech_stack.get(tech, 0) + 1
            
    # Structure the derived metrics output
    derived_metrics = {
        "summary": {
            "total_leverage_events": len(events),
            "total_projects": len(projects),
            "unique_categories_count": len(categories),
            "unique_technologies_count": len(tech_stack)
        },
        "categories": categories,
        "technologies": tech_stack
    }
    
    # Ensure generated directory exists
    GENERATED_DIR.mkdir(parents=True, exist_ok=True)
    
    output_path = GENERATED_DIR / "metrics-derived.json"
    with open(output_path, "w") as f:
        json.dump(derived_metrics, f, indent=2)
        
    print(f"✓ Derived metrics generated and written to {output_path}")
    sys.exit(0)

if __name__ == "__main__":
    main()
