# Define headers for the API request
$headers = @{
    "Accept" = "application/json"
    "Authorization" = "Basic <Base64EncodedCredentials>"  # Replace with your Base64 encoded credentials
    "Content-Type" = "application/json"
    "X-Request-ID" = "<UniqueRequestID>"  # Replace with a unique request ID
}

# Define the body of the API request
$body = @{
    settings = @{
        channel = "myChannel"  # Replace with your channel name
        uid = "5555"  # Replace with your user ID (UID)
        expiresAfter = 3600  # Token expiration time in seconds (1 hour)
    }
}

# Convert the body to JSON format
$bodyJson = $body | ConvertTo-Json

# Define Agora App ID and App Certificate
$appId = "32db6cb30a5541869bcb2774afd10fd4"  # Your Agora App ID
$appCertificate = "028dcd945c0b459faac2e92b676ac61e"  # Your Agora App Certificate

# Make the API call to generate a stream key
try {
    Invoke-RestMethod -Method Post `
        -Uri "https://api.agora.io/v1/projects/$appId/rtls/ingress/streamkeys" `
        -Headers $headers `
        -Body $bodyJson
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}