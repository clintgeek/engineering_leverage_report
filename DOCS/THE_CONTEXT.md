# THE_CONTEXT.md
This is a living document to be freely edited by human or AI. Its goal is to keep the required context for this project updated and portable. It should be maintained in a way that another engineer, IDE, or AI agent could read it and be up to speed in minutes. This includes the high level goals, metrics, constraints, and relevant background information about decisions and why they were made. 

## Key Decided Context

### Hosting & Infrastructure
* **Target Environment**: Docker container deployed on a private server.
* **Network & Ports**: Randomly allocated host port mappings to prevent conflicts with existing containers on the server.

### PDF Generation
* **Technology**: Python script using `playwright` to render the static HTML report consistently and efficiently.

### Workspace Structure
* `/data`: Core system of record containing JSON data and schemas.
* `/generated`: Output directory for generated metrics files.
* `/web`: React + TypeScript + Vite app rendering the report layouts.
* `/scripts`: Python tooling and validation scripts.

### Build & Validation Flows
* **Validation & Compilation**: Run via Python venv: `scripts/.venv/bin/python scripts/build_report.py`. This executes schema checks (`validate_data.py`) and compiles derived metrics (`generate_metrics.py`).
* **Web Quality Checks**: Run `npm run test`, `npm run lint`, and `npm run build` within `/web` for static compilation and quality check.

### Active Progress State
* **Phases 1-7 Completed**: Scaffolding, containerization setup, frontend components, Nivo charts/visualizations, vertical timeline, and full JSON migration for dynamic content rendering.
* **Next Stage**: Phase 8 (AI Workflow Documentation).
