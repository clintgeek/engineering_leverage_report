import json
import sys
from pathlib import Path
from jsonschema import validate, ValidationError

# Resolve directories using pathlib
SCRIPTS_DIR = Path(__file__).resolve().parent
ROOT_DIR = SCRIPTS_DIR.parent
DATA_DIR = ROOT_DIR / "data"
SCHEMA_DIR = DATA_DIR / "schemas"

def load_json(filepath):
    with open(filepath, "r") as f:
        return json.load(f)

def validate_file(data_filename, schema_filename):
    data_path = DATA_DIR / data_filename
    schema_path = SCHEMA_DIR / schema_filename
    
    print(f"Validating {data_filename} against {schema_filename}...")
    
    try:
        data = load_json(data_path)
        schema = load_json(schema_path)
        
        # If the root of the data is an array, validate each item
        if isinstance(data, list):
            for i, item in enumerate(data):
                try:
                    validate(instance=item, schema=schema)
                except ValidationError as e:
                    print(f"Error in {data_filename} at index {i}: {e.message}")
                    return False
        else:
            validate(instance=data, schema=schema)
            
        print(f"✓ {data_filename} is valid.")
        return True
    except FileNotFoundError as e:
        print(f"File not found: {e.filename}")
        return False
    except json.JSONDecodeError as e:
        print(f"JSON decode error in {data_filename}: {e.msg} on line {e.lineno}")
        return False
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return False

def main():
    success = True
    
    # Validate leverage events
    if not validate_file("leverage-events.json", "leverage-event.schema.json"):
        success = False
        
    # Validate projects
    if not validate_file("projects.json", "project.schema.json"):
        success = False
        
    # Validate lessons learned
    if not validate_file("lessons-learned.json", "lessons-learned.schema.json"):
        success = False
        
    if not success:
        print("Data validation failed!")
        sys.exit(1)
        
    print("All data validated successfully!")
    sys.exit(0)

if __name__ == "__main__":
    main()
