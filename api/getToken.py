from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs
import json
import time
from agora_token_builder import RtcTokenBuilder

# Replace these with your Agora App ID and App Certificate
APP_ID = "32db6cb30a5541869bcb2774afd10fd4"
APP_CERTIFICATE = "028dcd945c0b459faac2e92b676ac61e"

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Parse query parameters
        query = parse_qs(self.path.split('?')[-1])
        channel_name = query.get('channel', [''])[0]
        uid = query.get('uid', ['0'])[0]  # Use '0' for guests; otherwise, provide a specific user ID
        role = query.get('role', ['publisher'])[0]

        if not channel_name:
            self.send_response(400)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": "Channel name is required."}).encode())
            return

        # Set role for the token
        rtc_role = 1 if role.lower() == 'publisher' else 2

        # Token expiration time (in seconds)
        expiration_time_in_seconds = 3600  # 1 hour
        current_timestamp = int(time.time())
        privilege_expired_ts = current_timestamp + expiration_time_in_seconds

        # Generate the token
        token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channel_name, int(uid), rtc_role, privilege_expired_ts)

        # Send the response
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({"token": token}).encode())
