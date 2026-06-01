# THE_ARCHITECTURE.md

# Engineering Leverage Report Architecture

## Purpose

This document defines the technical architecture of the Engineering Leverage Report project.

The goal is to create a reusable system capable of generating:

* Public web reports
* Printable PDF reports
* Portfolio artifacts
* Future application-specific views

The architecture should emphasize:

* Simplicity
* Maintainability
* Reusability
* Portability
* Separation of concerns

The architecture itself should demonstrate the same leverage principles discussed within the report.

---

# Architectural Principles

## Single Source of Truth

Project data should exist in one place.

All presentation layers consume the same underlying data.

Avoid duplicated content.

Avoid manually synchronized content.

---

## Data Outlives Tools

Data should remain usable regardless of:

* Framework
* Hosting platform
* AI provider
* IDE
* Programming language

The report should be rebuildable even if React, Python, or current tooling is replaced in the future.

---

## Simple Over Clever

This project is a reporting platform.

It is not a SaaS product.

Avoid unnecessary complexity.

Avoid infrastructure that does not directly contribute value.

---

## Human Readable

Data and documentation should remain understandable without specialized tools.

A human should be able to inspect project data directly.

---

# System Overview

```text
JSON Data
    |
    +-- Python Scripts
    |       |
    |       +-- Validation
    |       +-- Analysis
    |       +-- Report Generation (Playwright PDF Export)
    |
    +-- React Frontend (Static Build)
            |
            +-- Docker Container (Nginx, randomized host port)
            +-- Visualizations
            +-- Public/Private Report View
            +-- Print CSS Stylesheet
```

---

# Layer Responsibilities

## Data Layer

Purpose:

Store all report information.

Technology:

* JSON

Location:

```text
/data
```

Examples:

```text
data/
├── leverage-events.json
├── projects.json
├── timeline.json
├── metrics.json
├── lessons-learned.json
└── metadata.json
```

Responsibilities:

* Store report content
* Store metrics
* Store timelines
* Store project information

Must not contain:

* Presentation logic
* Styling information
* UI concerns

The data layer is the system of record.

---

## Analysis Layer

Purpose:

Process and validate report data.

Technology:

* Python
* Playwright (headless browser for PDF printing)

Location:

```text
/scripts
```

Examples:

```text
scripts/
├── validate_data.py
├── generate_metrics.py
├── export_pdf.py
└── build_report.py
```

Responsibilities:

* Validate JSON structure
* Calculate metrics
* Generate derived values
* Generate consistent PDF exports using Playwright to render and print the static app

Must not contain:

* UI components
* Application styling

---

## Presentation Layer

Purpose:

Render information for human consumption.

Technology:

* React
* TypeScript
* Nivo

Deployment/Runtime:

* Standard static production build served by Nginx inside a Docker container
* Deployed on a private server with a randomized host-mapped port mapping to avoid conflicts

Location:

```text
/web
```

Responsibilities:

* Render report
* Render charts
* Render timelines
* Render project summaries
* Render print-friendly pages via standard `@media print` CSS

Must not contain:

* Source data
* Business rules
* Metric calculations

Presentation should consume data.

Not own it.

---

# Documentation Layer

The project contains four primary documentation artifacts.

---

## THE_CONTEXT.md

Purpose:

Project memory.

Acts as a persistent record of:

* Decisions
* Constraints
* Progress
* Open questions
* Lessons learned

May be modified by:

* Humans
* AI systems

This document is expected to evolve continuously.

---

## THE_PLAN.md

Purpose:

Strategic intent.

Defines:

* Goals
* Scope
* Success criteria
* Core narrative

Created using larger reasoning models.

Serves as project source of truth.

---

## THE_ARCHITECTURE.md

Purpose:

Technical design.

Defines:

* System organization
* Technology choices
* Data flow
* Layer responsibilities

Should change infrequently.

---

## THE_STEPS.md

Purpose:

Execution plan.

Defines:

* Tasks
* Implementation order
* Deliverables

Written so that a junior engineer or intern could execute the work.

Generated from:

* THE_PLAN.md
* THE_ARCHITECTURE.md

---

# Data Flow

```text
JSON Data
      |
      V
Python Validation
      |
      V
Python Analysis
      |
      V
React Rendering
      |
      +----> Website
      |
      +----> PDF Export
```

---

# Technology Choices

## JSON

Chosen because:

* Human readable
* Portable
* Language agnostic
* Easy to validate
* Easy to consume

JSON is the long-term system of record.

---

## Python

Chosen because:

* Excellent data processing
* Excellent report generation
* Excellent validation tooling
* Simple scripting

Python owns analysis.

---

## React

Chosen because:

* Familiar technology
* Strong visualization ecosystem
* Excellent component model
* Easy deployment

React owns presentation.

---

## Nivo

Chosen because:

* Clean charts
* React integration
* Responsive design
* Professional appearance

Nivo owns visualization.

---

## Playwright

Chosen because:

* Uses a headless browser to print pages to PDF exactly as they are rendered.
* Consistent and highly reliable rendering across different machines.
* Simple script integration in Python.

---

## Docker

Chosen because:

* Guarantees portability and consistent setup.
* Simplifies self-hosting on private servers.
* Allows containerization of the Nginx web app running on a randomized port to avoid conflicts.

---

# Explicit Non-Requirements

The following are intentionally excluded:

* Database
* Authentication
* Authorization
* Backend API
* GraphQL
* User accounts
* Real-time updates

This project serves one user.

Static data is sufficient.

---

# Future Expansion

Potential future additions:

* GitHub integration
* Resume generation
* Application-specific report views
* Automated project metrics
* Additional visualizations

Future features must preserve:

* Single source of truth
* Simplicity
* Maintainability

---

# Execution Methodology

To operate as efficiently and inexpensively as possible without affecting code quality, the project is executed using a hierarchical agent squad model:

* **Sage (Principal Architect)**: Oversees design, architecture, reviews plans, coordinates execution, and applies final polishes.
* **The Squad (Gemini Flash Subagents)**: Handles structured code implementation, validation scripts, boilerplate initialization, and content population.

---

# Guiding Principle

The architecture should embody the same philosophy promoted by the report itself:

Create leverage.

Reduce complexity.

Prefer reusable systems over one-time effort.

Store knowledge in durable artifacts.

Allow tools to change without losing data.

