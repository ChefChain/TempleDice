from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs
import os
import json
import time
import base64
import msgpack
from Crypto.Cipher import AES

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Retrieve environment variables
        app_id = os.getenv('AGORA_APP_ID')
        app_certificate = os.getenv('AGORA_APP_CERTIFICATE')

        # Parse query parameters
        query = parse_qs(self.path.split('?')[-1])
        channel_name = query.get('channel', [None])[0]
        uid = query.get('uid', [None])[0]
        expires_after = int(query.get('expiresAfter', [86400])[0])  # Default to 24 hours

        # Validate inputs
        if not app_id or not app_certificate or not channel_name or not uid:
            self.send_response(400)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": "Missing required parameters"}).encode())
            return

        # Generate the expiration timestamp
        expires_at = int(time.time()) + expires_after

        # Create the rtcInfo dictionary for msgpack encoding
        rtc_info = {
            "C": channel_name,
            "U": uid,
            "E": expires_at,
        }

        # Encode the rtcInfo dictionary using msgpack
        data = msgpack.packb(rtc_info)

        # Create an initialization vector and encryption key
        iv = os.urandom(16)
        key = bytes.fromhex(app_certificate)

        # Encrypt the data using AES-128-CTR
        cipher = AES.new(key, AES.MODE_CTR, nonce=iv)
        encrypted_data = cipher.encrypt(data)

        # Combine IV and encrypted data, then base64 encode
        stream_key = base64.urlsafe_b64encode(iv + encrypted_data).decode().strip('=')

        # Send the response
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({"stream_key": stream_key}).encode())
