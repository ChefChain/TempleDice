import base64
import requests
import json
import os

# Retrieve credentials from environment variables
CUSTOMER_ID = os.environ.get('AGORA_API_CUSTOMER_ID')
CUSTOMER_SECRET = os.environ.get('AGORA_API_CUSTOMER_SECRET')
APP_ID = os.environ.get('AGORA_APP_ID')
APP_CERTIFICATE = os.environ.get('AGORA_APP_CERTIFICATE')

# Function to generate Base64 encoded credentials
def generate_base64_credentials(customer_id, customer_secret):
    credentials = f'{customer_id}:{customer_secret}'
    return base64.b64encode(credentials.encode()).decode()

# Main handler function for Vercel
def handler(request):
    headers = {
        "Accept": "application/json",
        "Authorization": f"Basic {generate_base64_credentials(CUSTOMER_ID, CUSTOMER_SECRET)}",
        "Content-Type": "application/json",
        "X-Request-ID": "unique-request-id"  # You can generate a unique ID if needed
    }

    body = {
        "settings": {
            "channel": "myChannel",  # Replace with your channel name or get from request
            "uid": "5555",           # Replace with your user ID (UID) or get from request
            "expiresAfter": 3600     # Token expiration time in seconds (1 hour)
        }
    }

    url = f"https://api.agora.io/v1/projects/{APP_ID}/rtls/ingress/streamkeys"

    try:
        response = requests.post(url, headers=headers, json=body)
        if response.status_code == 200:
            return {
                "statusCode": 200,
                "body": json.dumps(response.json()),
                "headers": {"Content-Type": "application/json"}
            }
        else:
            return {
                "statusCode": response.status_code,
                "body": json.dumps({"error": response.text}),
                "headers": {"Content-Type": "application/json"}
            }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)}),
            "headers": {"Content-Type": "application/json"}
        }
