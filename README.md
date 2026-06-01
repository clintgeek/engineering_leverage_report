# Engineering Leverage Report

A system of record and reporting platform demonstrating engineering leverage, learning velocity, automation, and reusable workflows over the last 12 months.

## Structure

* `/data` - System of record (JSON data)
* `/scripts` - Python validation and metrics generation scripts
* `/web` - React / TypeScript / Vite presentation layer
* `/generated` - Built static reports, charts, and PDF documents

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
