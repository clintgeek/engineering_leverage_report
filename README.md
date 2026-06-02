# Engineering Leverage Report

A system of record and reporting platform demonstrating engineering leverage, learning velocity, automation, and reusable workflows over the last 12 months.

## Structure

* `/data` - System of record (JSON data)
* `/scripts` - Python validation and metrics generation scripts
* `/web` - React / TypeScript / Vite presentation layer
* `/generated` - Built static reports

## How to Run

### Local Frontend Development
```bash
cd web
npm install
npm run dev
```

### Docker Production Deployment
To build and serve the application containerized on a private server:

1. **Build the Image**:
   ```bash
   docker build -t engineering-leverage-report .
   ```

2. **Run the Container (using a random host port to avoid conflicts)**:
   ```bash
   # Example choosing a random host port (e.g., 48273)
   docker run -d \
     --name engineering-leverage-report \
     -p 48273:80 \
     --restart unless-stopped \
     engineering-leverage-report
   ```

### Docker Compose Deployment
Alternatively, use Docker Compose (which supports configuration via environment variables or a `.env` file):

1. **Optionally configure the port** by setting the `PORT` environment variable or creating a `.env` file at the root:
   ```text
   PORT=48273
   ```

2. **Start the service**:
   ```bash
   docker compose up -d --build
   ```

### Python Scripts Setup
The validation, metrics generation, and HTML export scripts require a Python virtualenv.

1. **Create the virtualenv and install dependencies**:
   ```bash
   cd scripts
   python3 -m venv .venv
   .venv/bin/pip install -r requirements.txt
   ```

2. **Run the full build pipeline** (validate data → compile metrics → build frontend → export HTML):
   ```bash
   scripts/.venv/bin/python scripts/build_report.py
   ```

3. **Run the test suite**:
   ```bash
   scripts/.venv/bin/pytest
   ```
