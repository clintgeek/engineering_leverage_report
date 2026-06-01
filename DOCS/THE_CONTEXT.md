# THE_CONTEXT.md
This is a living document to be freely edited by human or AI. It's goal is to keep the required context for this project updated and portable. It should be maintained in a way that another engineer, IDE, or AI agent could read it and be up to speed in minutes. This includes the high level goals, metrics, constraints, and relevant background information about decisions and why they were made. 

## Key Decided Context

### Hosting & Infrastructure
* **Target Environment**: Docker container deployed on a private server.
* **Network & Ports**: Randomly allocated host port mappings to prevent conflicts with existing containers on the server.

### PDF Generation
* **Technology**: Python script using `playwright` to render the static HTML report consistently and efficiently.

### Execution Model
* **Squad Coordination**: Sage (Principal Architect) delegates structured phase tasks to the Squad (Gemini Flash subagents) to optimize for speed and cost efficiency while maintaining code quality.
