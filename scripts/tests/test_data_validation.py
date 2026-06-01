import json
import sys
import pytest
from pathlib import Path
from jsonschema import ValidationError

# Resolve paths using pathlib
TESTS_DIR = Path(__file__).resolve().parent
SCRIPTS_DIR = TESTS_DIR.parent
ROOT_DIR = SCRIPTS_DIR.parent

sys.path.insert(0, str(SCRIPTS_DIR))
import validate_data

# Valid leverage event mock
VALID_EVENT = {
    "id": "test-event",
    "title": "Test Event Title",
    "category": "Test Category",
    "timeframe": "Q1 2026",
    "problem": "Test problem description",
    "approach": "Test approach taken",
    "outcome": "Test outcome achieved",
    "leverage": "Test leverage demonstrated"
}

# Invalid event missing 'leverage' key
INVALID_EVENT_MISSING_KEY = {
    "id": "test-event",
    "title": "Test Event Title",
    "category": "Test Category",
    "timeframe": "Q1 2026",
    "problem": "Test problem description",
    "approach": "Test approach taken",
    "outcome": "Test outcome achieved"
}

# Invalid event with wrong type (integer instead of string)
INVALID_EVENT_WRONG_TYPE = {
    "id": "test-event",
    "title": "Test Event Title",
    "category": 12345,  # Should be string
    "timeframe": "Q1 2026",
    "problem": "Test problem description",
    "approach": "Test approach taken",
    "outcome": "Test outcome achieved",
    "leverage": "Test leverage"
}

@pytest.fixture
def load_schemas():
    schema_dir = ROOT_DIR / "data" / "schemas"
    
    with open(schema_dir / "leverage-event.schema.json", "r") as f:
        event_schema = json.load(f)
        
    with open(schema_dir / "project.schema.json", "r") as f:
        project_schema = json.load(f)
        
    return event_schema, project_schema

def test_schema_valid_event(load_schemas):
    event_schema, _ = load_schemas
    from jsonschema import validate
    validate(instance=VALID_EVENT, schema=event_schema)

def test_schema_invalid_event_missing_key(load_schemas):
    event_schema, _ = load_schemas
    from jsonschema import validate
    with pytest.raises(ValidationError):
        validate(instance=INVALID_EVENT_MISSING_KEY, schema=event_schema)

def test_schema_invalid_event_wrong_type(load_schemas):
    event_schema, _ = load_schemas
    from jsonschema import validate
    with pytest.raises(ValidationError):
        validate(instance=INVALID_EVENT_WRONG_TYPE, schema=event_schema)

def test_derived_metrics_calculations():
    # Test metrics compiler logic
    events = [
        {"category": "Automation"},
        {"category": "Automation"},
        {"category": "Enablement"}
    ]
    projects = [
        {"technologies": ["React", "TypeScript"]},
        {"technologies": ["Python", "React"]}
    ]
    
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
            
    assert categories["Automation"] == 2
    assert categories["Enablement"] == 1
    assert tech_stack["React"] == 2
    assert tech_stack["TypeScript"] == 1
    assert tech_stack["Python"] == 1

def test_build_report_execution():
    import subprocess
    build_script = SCRIPTS_DIR / "build_report.py"
    
    # Run build_report.py
    result = subprocess.run([sys.executable, str(build_script)], capture_output=True, text=True)
    
    # Assert successful orchestration run
    assert result.returncode == 0, f"build_report.py failed with: {result.stderr}"
    
    # Verify the output file exists and is valid JSON
    generated_metrics_path = ROOT_DIR / "generated" / "metrics-derived.json"
    assert generated_metrics_path.exists()
    
    with open(generated_metrics_path, "r") as f:
        derived_data = json.load(f)
        
    assert "summary" in derived_data
    assert "categories" in derived_data
    assert "technologies" in derived_data
