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
* **Phases 1-9 Completed**: Scaffolding, containerization setup, frontend components, Nivo charts/visualizations, vertical timeline, full JSON migration for dynamic content rendering, AI workflow documentation, and Playwright PDF export.
* **Current Stage**: Iteration 3 - Engineer's Notebook framing.
* **Latest Recovery Work**: Restored the interrupted narrative polish after an app crash by completing hero metadata, leverage event copy, curated leverage summary cards, a before/after AI-assisted engineering chart, key milestones, responsive styling, and aligned tests. Full validation, frontend tests, lint, build, and PDF export passed as of 2026-06-01.
* **Latest Direction Change**: Reframed the page away from an AI dashboard/product aesthetic and toward engineering notes for senior engineers. The report now emphasizes the repeatable AI workflow system, plain evidence, compact leverage facts, mini case studies, release-note milestones, and selected projects. The Lessons Learned section was removed from the frontend.
