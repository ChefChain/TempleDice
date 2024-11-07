# server.py
import requests
import os
from dotenv import load_dotenv
from http.server import BaseHTTPRequestHandler
import json

# Load environment variables
load_dotenv()

# Get PlayFab credentials from environment variables
TITLE_ID = os.getenv('PLAYFAB_TITLE_ID')
SECRET_KEY = os.getenv('PLAYFAB_SECRET_KEY')

if not TITLE_ID or not SECRET_KEY:
    raise ValueError("[ERROR] PLAYFAB_TITLE_ID and SECRET_KEY must be set in the environment variables.")

# Set PlayFab API URLs
TITLE_ID = TITLE_ID.upper()
AUTH_URL = f'https://{TITLE_ID}.playfabapi.com/Client/LoginWithCustomID'

# Set headers for PlayFab API requests
HEADERS = {
    'Content-Type': 'application/json',
    'X-SecretKey': SECRET_KEY
}

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/api/login':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            # Debugging: Print received post_data
            print("[DEBUG] Received post data:", post_data)

            try:
                request_data = json.loads(post_data)
            except json.JSONDecodeError:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Invalid JSON"}).encode())
                return

            custom_id = request_data.get('custom_id')
            
            if not custom_id:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"error": "custom_id is required"}).encode())
                return

            payload = {
                "TitleId": TITLE_ID,
                "CustomId": custom_id,
                "CreateAccount": True
            }

            # Debugging: Print payload
            print("[DEBUG] Payload for PlayFab request:", payload)

            try:
                response = requests.post(AUTH_URL, headers=HEADERS, json=payload)
                
                # Debugging: Print response status and content
                print("[DEBUG] PlayFab response status code:", response.status_code)
                print("[DEBUG] PlayFab response content:", response.text)
                
                response.raise_for_status()
                data = response.json()
                if data.get('code') == 200:
                    session_ticket = data.get('data', {}).get('SessionTicket')
                    playfab_id = data.get('data', {}).get('PlayFabId')
                    self.send_response(200)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({"playfab_id": playfab_id, "session_ticket": session_ticket}).encode())
                else:
                    self.send_response(400)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({"error": data.get('errorMessage', 'Unknown error')}).encode())
            except requests.exceptions.RequestException as e:
                # Debugging: Print error details
                print("[ERROR] Request to PlayFab failed:", str(e))
                
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode())
        else:
            self.send_response(404)
            self.end_headers()

# Test endpoint example: https://templedice.vercel.app/api/login
