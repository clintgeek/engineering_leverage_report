# THE_STEPS.md

# Engineering Leverage Report - Implementation Steps

## Phase 1 - Project Initialization

### Goal

Create a running project skeleton with deployment capability.

---

### Task 1.1 - Create Repository

Create a new Git repository.

Repository name:

```text
engineering-leverage-report
```

---

### Task 1.2 - Create Base Directory Structure

Create:

```text
engineering-leverage-report/
├── data/
├── scripts/
├── web/
├── docs/
├── generated/
├── THE_CONTEXT.md
├── THE_PLAN.md
├── THE_ARCHITECTURE.md
├── THE_STEPS.md
└── README.md
```

Commit.

---

### Task 1.3 - Create React Application

Inside:

```text
/web
```

Create:

* React
* TypeScript
* Vite

Verify application runs locally.

Commit.

---

### Task 1.4 - Configure Tooling

Install:

* ESLint
* Prettier

Create:

```text
.eslintrc
.prettierrc
```

Verify linting works.

Commit.

---

### Task 1.5 - Configure Docker Deployment

Create a `Dockerfile` for serving the built React app via Nginx.

Define host port mapping to use a randomized port (e.g. mapping `80` to a random host port to prevent server conflicts).

Verify container builds and runs locally on the specified random port.

Commit Docker configurations and instructions to README.

Commit.

---

## Phase 2 - Data Layer

### Goal

Create the system of record.

---

### Task 2.1 - Create Data Directory Structure

Create:

```text
data/
├── leverage-events.json
├── projects.json
├── timeline.json
├── metrics.json
├── lessons-learned.json
└── metadata.json
```

Populate with empty arrays.

Commit.

---

### Task 2.2 - Define Leverage Event Schema

Create JSON schema documentation.

Required fields:

```json
{
  "id": "",
  "title": "",
  "category": "",
  "timeframe": "",
  "problem": "",
  "approach": "",
  "outcome": "",
  "leverage": ""
}
```

Document schema.

Commit.

---

### Task 2.3 - Define Project Schema

Required fields:

```json
{
  "id": "",
  "name": "",
  "description": "",
  "technologies": [],
  "githubUrl": "",
  "websiteUrl": ""
}
```

Commit.

---

### Task 2.4 - Create Initial Data

Add leverage events:

* Copilot Rollout
* GeekSuite
* Python Learning
* geekPR
* AI Workflow Methodology

Use placeholder content.

Commit.

---

## Phase 3 - Python Layer

### Goal

Create validation and report generation tooling.

---

### Task 3.1 - Create Python Environment

Create:

```text
scripts/
```

Initialize Python project.

Create:

```text
requirements.txt
```

Install:

* pydantic
* jsonschema
* playwright
* pytest

Commit.

---

### Task 3.2 - Create Data Validation Script

Create:

```text
scripts/validate_data.py
```

Responsibilities:

* Load all JSON files.
* Verify structure.
* Verify required fields.
* Output validation results.

Exit with non-zero code on failure.

Commit.

---

### Task 3.3 - Create Metrics Generator

Create:

```text
scripts/generate_metrics.py
```

Responsibilities:

* Read leverage events.
* Generate chart-ready data.
* Generate summary metrics.
* Output generated JSON.

Write output to:

```text
generated/
```

Commit.

---

### Task 3.4 - Create Build Script

Create:

```text
scripts/build_report.py
```

Responsibilities:

1. Validate data.
2. Generate metrics.
3. Generate report artifacts.

Commit.

---

### Task 3.5 - Create Automated Tests

Create:

```text
scripts/tests/
```

Write test suites (e.g., using `pytest`) to verify:
* Schema validator catches missing fields, incorrect types, and invalid schemas.
* Metrics generator correctly counts, aggregates, and transforms event metrics.
* Build script runs without errors on valid data structures.

Commit.

---

## Phase 4 - React Data Models

### Goal

Create strongly typed frontend models.

---

### Task 4.1 - Create Types Directory

Create:

```text
web/src/types/
```

Create:

```text
LeverageEvent.ts
Project.ts
Metric.ts
TimelineEvent.ts
```

Commit.

---

### Task 4.2 - Create Data Loading Layer

Create:

```text
web/src/services/
```

Create:

```text
dataLoader.ts
```

Responsibilities:

* Load JSON.
* Convert to typed models.

Commit.

---

### Task 4.3 - Create Data Loading Layer Tests

Install Vitest and setup test configurations in `web/`.

Create unit tests verifying:
* `dataLoader.ts` successfully retrieves and parses valid schema configurations.
* Loader gracefully catches invalid, missing, or malformed JSON formats.

Commit.

---

## Phase 5 - Report Layout

### Goal

Build report skeleton.

---

### Task 5.1 - Create Page Structure

Create:

```text
web/src/pages/
```

Create:

```text
ReportPage.tsx
```

Commit.

---

### Task 5.2 - Create Component Structure

Create:

```text
web/src/components/
├── Hero/
├── ExecutiveSummary/
├── Charts/
├── LeverageEvents/
├── WorkflowMethodology/
├── Projects/
└── LessonsLearned/
```

Create placeholder components.

Commit.

---

### Task 5.3 - Assemble Report Page

Render all sections in order.

Verify page loads.

Commit.

---

### Task 5.4 - Create Component Tests

Configure React Testing Library in `web/`.

Write test suites for core page containers (e.g., `Hero`, `ExecutiveSummary`, `WorkflowMethodology`) to verify:
* Texts, headings, and description blocks render correctly.
* Interactive components toggle correctly.

Commit.

---

## Phase 6 - Visualizations

### Goal

Display leverage data visually.

---

### Task 6.1 - Install Nivo

Install Nivo dependencies.

Verify chart rendering.

Commit.

---

### Task 6.2 - Create Leverage Chart

Create:

```text
LeverageOverTimeChart.tsx
```

Requirements:

* Responsive.
* Mobile friendly.
* Printable.

Commit.

---

### Task 6.3 - Create Event Timeline

Create timeline visualization.

Display:

* Copilot Rollout
* GeekSuite
* Python Learning
* geekPR
* Workflow Methodology

Commit.

---

### Task 6.4 - Create Visualization Tests

Write component tests for Nivo charts and timelines to verify:
* Charts and grids render properly in the virtual DOM.
* Timeline items correspond to input milestones.

Commit.

---

## Phase 7 - Content Population

### Goal

Replace placeholders with actual content.

---

### Task 7.1 - Populate Leverage Events

Add complete content.

Verify:

* Problem
* Approach
* Outcome
* Leverage

for every event.

Commit.

---

### Task 7.2 - Populate Projects

Add:

* GeekSuite
* geekPR
* Additional GitHub projects

Add links.

Commit.

---

### Task 7.3 - Populate Lessons Learned

Add lessons learned section.

Focus on:

* AI
* Automation
* Learning
* Reuse
* Engineering effectiveness

Commit.

---

## Phase 8 - AI Workflow Documentation

### Goal

Document methodology.

---

### Task 8.1 - Create Workflow Diagram

Diagram:

```text
THE_CONTEXT.md
        ↓
THE_PLAN.md
        ↓
THE_STEPS.md
        ↓
Execution
        ↓
THE_CONTEXT.md
```

Render on report.

Commit.

---

### Task 8.2 - Create Workflow Explanation

Document:

* Purpose of THE_CONTEXT.md
* Purpose of THE_PLAN.md
* Purpose of THE_ARCHITECTURE.md
* Purpose of THE_STEPS.md

Commit.

---

## Phase 9 - PDF Generation

### Goal

Generate printable artifact.

---

### Task 9.1 - Create Print Stylesheet

Requirements:

* Hide navigation.
* Optimize spacing.
* Maintain chart readability.

Commit.

---

### Task 9.2 - Generate PDF

Create `scripts/export_pdf.py` using Playwright:
* Launch a headless Chromium browser instance.
* Navigate to the running or built React app.
* Print/save the page to PDF at `generated/engineering-leverage-report.pdf` using standard print stylesheet rules.

Verify layout and formatting of the generated PDF.

Commit.

---

## Phase 10 - Portfolio Integration

### Goal

Publish and reuse.

---

### Task 10.1 - Connect Portfolio

Add link from:

```text
portfolio.clintgeek.com
```

Commit.

---

### Task 10.2 - Update README

Include:

* Purpose
* Architecture
* Local setup
* Build process
* Workflow explanation

Commit.

---

### Task 10.3 - Publish Version 1

Verify:

* Website works
* Charts work
* PDF works
* GitHub repo is public
* Portfolio link works

Create v1 release.

Commit.

---

# Definition of Done

The project is complete when:

* Public website exists.
* PDF can be generated.
* All report content is data-driven.
* JSON is the system of record.
* Python validates and generates report artifacts.
* React renders the report.
* Portfolio links to the report.
* The report clearly demonstrates engineering leverage over the last 12 months.
* The project itself demonstrates the AI workflow described within the report.
