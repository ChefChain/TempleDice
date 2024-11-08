import os
import json
import time
import base64
import msgpack
import hashlib
from Crypto.Cipher import AES
from flask import Flask, request, jsonify

app = Flask(__name__)

def generate_stream_key():
    # Fetch environment variables
    app_id = os.getenv('AGORA_APP_ID')
    app_certificate = os.getenv('AGORA_APP_CERTIFICATE')
    channel_name = request.args.get('channel', os.getenv('CHANNEL_NAME'))
    uid = request.args.get('uid', os.getenv('UID'))
    expires_after = int(request.args.get('expiresAfter', 86400))  # Default to 24 hours

    if not app_id or not app_certificate or not channel_name or not uid:
        return {"error": "Missing required parameters"}, 400

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

    return jsonify({"stream_key": stream_key})

@app.route('/api/generate_stream_key', methods=['GET'])
def handle_request():
    return generate_stream_key()

# Run in Vercel (main handler)
handler = app
