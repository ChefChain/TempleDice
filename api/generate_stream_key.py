import os
import base64
import requests
import json

def generate_base64_credentials(customer_id, customer_secret):
    credentials = f'{customer_id}:{customer_secret}'
    return base64.b64encode(credentials.encode()).decode()

def handler(request):
    # Retrieve credentials from environment variables
    CUSTOMER_ID = os.environ.get('AGORA_API_CUSTOMER_ID')
    CUSTOMER_SECRET = os.environ.get('AGORA_API_CUSTOMER_SECRET')
    APP_ID = os.environ.get('AGORA_APP_ID')
    APP_CERTIFICATE = os.environ.get('AGORA_APP_CERTIFICATE')

    if not all([CUSTOMER_ID, CUSTOMER_SECRET, APP_ID, APP_CERTIFICATE]):
        return {
            "statusCode": 500,
            "body": json.dumps({"error": "Missing one or more required environment variables."}),
            "headers": {"Content-Type": "application/json"}
        }

    # Get parameters from the URL query string
    channel = request.args.get('channel', 'myChannel')
    uid = request.args.get('uid', '5555')
    expires_after = request.args.get('expiresAfter', '3600')  # Default to 1 hour

    # Build headers and body for the API request
    headers = {
        "Accept": "application/json",
        "Authorization": f"Basic {generate_base64_credentials(CUSTOMER_ID, CUSTOMER_SECRET)}",
        "Content-Type": "application/json",
        "X-Request-ID": "unique-request-id"  # Optionally generate a unique ID
    }

    body = {
        "settings": {
            "channel": channel,
            "uid": uid,
            "expiresAfter": int(expires_after)
        }
    }

    url = f"https://api.agora.io/v1/projects/{APP_ID}/rtls/ingress/streamkeys"

    try:
        response = requests.post(url, headers=headers, json=body)
        if response.status_code in [200, 201]:
            return {
                "statusCode": response.status_code,
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
