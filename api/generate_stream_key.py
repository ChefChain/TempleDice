from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse
import os
import json
import time
from agora_token_builder import RtcTokenBuilder

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Retrieve environment variables for App ID and Certificate
        app_id = os.getenv('AGORA_APP_ID')
        app_certificate = os.getenv('AGORA_APP_CERTIFICATE')

        # Parse query parameters from the URL
        query = parse_qs(urlparse(self.path).query)
        channel_name = query.get('channel', [None])[0]
        uid = query.get('uid', [None])[0]
        expires_after = int(query.get('expiresAfter', [86400])[0])  # Default to 24 hours

        # Validate inputs
        if not app_id:
            self.send_error(400, "Missing AGORA_APP_ID environment variable")
            return
        
        if not app_certificate:
            self.send_error(400, "Missing AGORA_APP_CERTIFICATE environment variable")
            return
        
        if not channel_name:
            self.send_error(400, "Missing 'channel' parameter")
            return
        
        if not uid:
            self.send_error(400, "Missing 'uid' parameter")
            return

        # Generate the expiration timestamp for the token
        current_timestamp = int(time.time())
        privilege_expired_ts = current_timestamp + expires_after

        # Generate Agora RTC Token using RtcTokenBuilder
        try:
            stream_key = RtcTokenBuilder.buildTokenWithUid(
                app_id,
                app_certificate,
                channel_name,
                int(uid),
                RtcTokenBuilder.Role_PUBLISHER,
                privilege_expired_ts
            )
        except Exception as e:
            self.send_error(500, f"Error generating token: {str(e)}")
            return

        # Send the response with the generated stream key (token)
        response = {
            "stream_key": stream_key,
            "expires_at": privilege_expired_ts,
            "channel": channel_name,
            "uid": uid
        }
        
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        
        self.wfile.write(json.dumps(response).encode())
