from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse
import os
import json
import requests

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Retrieve environment variables for Dolby.io
        publish_token = os.getenv('DOLBYIO_PUBLISH_TOKEN')
        default_stream_name = os.getenv('DOLBYIO_STREAM_NAME')  # Default stream name if not provided in query

        # Parse query parameters from the URL
        query = parse_qs(urlparse(self.path).query)
        stream_name = query.get('streamName', [default_stream_name])[0]

        # Validate inputs
        if not publish_token:
            self.send_error(400, "Missing DOLBYIO_PUBLISH_TOKEN environment variable")
            return

        if not stream_name:
            self.send_error(400, "Missing 'streamName' parameter and DOLBYIO_STREAM_NAME is not set")
            return

        # Make the API call to the Dolby.io publish endpoint
        try:
            headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": f"Bearer {publish_token}"
            }

            data = {
                "streamName": stream_name
            }

            response = requests.post(
                "https://director.millicast.com/api/director/publish",
                headers=headers,
                json=data
            )
            response.raise_for_status()
            publish_response = response.json()
        except Exception as e:
            self.send_error(500, f"Error generating publish details: {str(e)}")
            return

        # Construct the RTMP publish path and stream key
        rtmp_publish_path = "rtmp://rtmp-auto.millicast.com:1935/v2/pub"
        rtmp_publish_stream_key = f"{stream_name}?token={publish_token}"

        # Include RTMP details in the response
        publish_response['rtmp_publish_path'] = rtmp_publish_path
        publish_response['rtmp_publish_stream_key'] = rtmp_publish_stream_key

        # Send the response with the publish details
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

        self.wfile.write(json.dumps(publish_response).encode())
