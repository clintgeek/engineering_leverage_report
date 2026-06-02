import json
import sys
import pytest
from pathlib import Path
from jsonschema import validate, ValidationError

TESTS_DIR = Path(__file__).resolve().parent
SCRIPTS_DIR = TESTS_DIR.parent
ROOT_DIR = SCRIPTS_DIR.parent

sys.path.insert(0, str(SCRIPTS_DIR))
import generate_metrics

VALID_EVENT = {
    "id": "test-event",
    "title": "Test Event Title",
    "category": "Test Category",
    "timeframe": "Q1 2026",
    "problem": "Test problem description",
    "approach": "Test approach taken",
    "outcome": "Test outcome achieved",
    "leverage": "Test leverage demonstrated",
}

VALID_PROJECT = {
    "id": "test-proj",
    "name": "Test Project",
    "description": "A test project.",
    "technologies": ["Python", "React"],
    "githubUrl": "https://github.com/test/test",
    "websiteUrl": "https://test.example.com",
}

@pytest.fixture(scope="module")
def schemas():
    schema_dir = ROOT_DIR / "data" / "schemas"
    return {
        "event":   json.loads((schema_dir / "leverage-event.schema.json").read_text()),
        "project": json.loads((schema_dir / "project.schema.json").read_text()),
        "lesson":  json.loads((schema_dir / "lessons-learned.schema.json").read_text()),
    }

# --- Schema validation ---

def test_valid_event_passes_schema(schemas):
    validate(instance=VALID_EVENT, schema=schemas["event"])

def test_event_missing_required_field_fails_schema(schemas):
    invalid = {k: v for k, v in VALID_EVENT.items() if k != "leverage"}
    with pytest.raises(ValidationError):
        validate(instance=invalid, schema=schemas["event"])

def test_event_wrong_type_fails_schema(schemas):
    invalid = {**VALID_EVENT, "category": 12345}
    with pytest.raises(ValidationError):
        validate(instance=invalid, schema=schemas["event"])

def test_valid_project_passes_schema(schemas):
    validate(instance=VALID_PROJECT, schema=schemas["project"])

def test_project_missing_required_field_fails_schema(schemas):
    invalid = {k: v for k, v in VALID_PROJECT.items() if k != "name"}
    with pytest.raises(ValidationError):
        validate(instance=invalid, schema=schemas["project"])

def test_valid_lesson_passes_schema(schemas):
    validate(instance={"title": "T", "description": "D"}, schema=schemas["lesson"])

def test_lesson_missing_description_fails_schema(schemas):
    with pytest.raises(ValidationError):
        validate(instance={"title": "T"}, schema=schemas["lesson"])

# --- generate_metrics logic ---

def test_metrics_category_counts():
    events = [
        {"category": "Automation"},
        {"category": "Automation"},
        {"category": "Enablement"},
    ]
    projects = [
        {"technologies": ["React", "TypeScript"]},
        {"technologies": ["Python", "React"]},
    ]
    result = generate_metrics.compute_metrics(events, projects)
    assert result["summary"]["total_leverage_events"] == 3
    assert result["summary"]["total_projects"] == 2
    assert result["categories"]["Automation"] == 2
    assert result["categories"]["Enablement"] == 1

def test_metrics_technology_counts():
    events = []
    projects = [
        {"technologies": ["React", "TypeScript"]},
        {"technologies": ["Python", "React"]},
    ]
    result = generate_metrics.compute_metrics(events, projects)
    assert result["technologies"]["React"] == 2
    assert result["technologies"]["TypeScript"] == 1
    assert result["technologies"]["Python"] == 1

def test_metrics_empty_input():
    result = generate_metrics.compute_metrics([], [])
    assert result["summary"]["total_leverage_events"] == 0
    assert result["summary"]["total_projects"] == 0
    assert result["categories"] == {}
    assert result["technologies"] == {}

# --- Real data files pass their own schemas ---

def test_real_leverage_events_match_schema(schemas):
    events = json.loads((ROOT_DIR / "data" / "leverage-events.json").read_text())
    for event in events:
        validate(instance=event, schema=schemas["event"])

def test_real_projects_match_schema(schemas):
    projects = json.loads((ROOT_DIR / "data" / "projects.json").read_text())
    for project in projects:
        validate(instance=project, schema=schemas["project"])
