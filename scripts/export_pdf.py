"""
export_pdf.py

Exports a PDF of the engineering leverage report by:
  1. Serving the pre-built static frontend (web/dist) on a free local port.
  2. Navigating to it with a headless Playwright Chromium browser.
  3. Printing the page to PDF using the @media print stylesheet.

Prerequisite: Playwright's Chromium browser must be installed once per machine:
  scripts/.venv/bin/playwright install chromium
"""
import time
import socket
import threading
from http.server import SimpleHTTPRequestHandler
from socketserver import TCPServer
from pathlib import Path
from playwright.sync_api import sync_playwright

# Resolve directory locations
SCRIPTS_DIR = Path(__file__).resolve().parent
ROOT_DIR = SCRIPTS_DIR.parent
WEB_DIST_DIR = ROOT_DIR / "web" / "dist"
GENERATED_DIR = ROOT_DIR / "generated"

class ThreadedHTTPServer(TCPServer):
    allow_reuse_address = True

def get_free_port():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('', 0))
        return s.getsockname()[1]

def run_server(port, directory, stop_event):
    def handler(*args, **kwargs):
        return SimpleHTTPRequestHandler(*args, directory=str(directory), **kwargs)
    
    with ThreadedHTTPServer(("127.0.0.1", port), handler) as httpd:
        # Check periodically if server should shut down
        while not stop_event.is_set():
            httpd.handle_request()

def main():
    print("Starting PDF generation process...")
    
    # 1. Ensure web/dist exists
    if not WEB_DIST_DIR.exists():
        print("✖ Error: static build directory does not exist! Please run 'npm run build' inside /web first.")
        sys.exit(1)
        
    port = get_free_port()
    print(f"Starting temporary web server on port {port}...")
    
    # Stop event for the server thread
    stop_event = threading.Event()
    
    # Start server thread
    server_thread = threading.Thread(target=run_server, args=(port, WEB_DIST_DIR, stop_event), daemon=True)
    server_thread.start()
    
    # Give the server a moment to start
    time.sleep(1.0)
    
    # Ensure output directory exists
    GENERATED_DIR.mkdir(parents=True, exist_ok=True)
    pdf_path = GENERATED_DIR / "engineering-leverage-report.pdf"
    
    try:
        with sync_playwright() as p:
            print("Launching headless browser...")
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            
            url = f"http://127.0.0.1:{port}"
            print(f"Navigating to local deployment at {url}...")
            page.goto(url, wait_until="networkidle")
            
            # Wait for any visual animations or chart render adjustments to complete
            print("Waiting for visual assets and animations to complete...")
            time.sleep(2.0)
            
            print(f"Generating PDF output at {pdf_path}...")
            page.pdf(
                path=str(pdf_path),
                format="A4",
                print_background=True,
                margin={"top": "0.4in", "right": "0.4in", "bottom": "0.4in", "left": "0.4in"}
            )
            
            browser.close()
            print("✓ PDF generated successfully!")
            
    except Exception as e:
        print(f"✖ Generation failed: {str(e)}")
        sys.exit(1)
    finally:
        # Signal the server thread to stop on the next loop iteration.
        stop_event.set()
        # handle_request() is a blocking call — it waits for the next connection.
        # Send a dummy GET request to unblock it so the thread can check
        # stop_event and exit cleanly, rather than hanging until timeout.
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.connect(("127.0.0.1", port))
                s.sendall(b"GET / HTTP/1.1\r\n\r\n")
        except Exception:
            pass

if __name__ == "__main__":
    main()
