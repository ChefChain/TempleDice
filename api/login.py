# server.py
import requests
import os
from flask import Flask, request, redirect, jsonify
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get PlayFab credentials from environment variables
TITLE_ID = os.getenv('PLAYFAB_TITLE_ID')
SECRET_KEY = os.getenv('PLAYFAB_SECRET_KEY')

if not TITLE_ID or not SECRET_KEY:
    raise ValueError("[ERROR] PLAYFAB_TITLE_ID and SECRET_KEY must be set in the environment variables.")

# Set PlayFab API URLs
TITLE_ID = TITLE_ID.upper()
SERVER_URL = f'https://{TITLE_ID}.playfabapi.com/Server'
AUTH_URL = f'https://{TITLE_ID}.playfabapi.com/Client/LoginWithCustomID'

# Set headers for PlayFab API requests
HEADERS = {
    'Content-Type': 'application/json',
    'X-SecretKey': SECRET_KEY
}

# Flask app setup
app = Flask(__name__)

@app.route('/login', methods=['POST'])
def login():
    """Handles login using PlayFab's LoginWithCustomID API"""
    custom_id = request.json.get('custom_id')
    if not custom_id:
        return jsonify({"error": "custom_id is required"}), 400

    payload = {
        "TitleId": TITLE_ID,
        "CustomId": custom_id,
        "CreateAccount": True
    }

    try:
        response = requests.post(AUTH_URL, headers=HEADERS, json=payload)
        response.raise_for_status()
        data = response.json()
        if data.get('code') == 200:
            session_ticket = data.get('data', {}).get('SessionTicket')
            playfab_id = data.get('data', {}).get('PlayFabId')
            return jsonify({"playfab_id": playfab_id, "session_ticket": session_ticket})
        else:
            return jsonify({"error": data.get('errorMessage', 'Unknown error')}), 400
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
