# Define the Vercel URL with the actual endpoint
$vercelUrl = "https://templedice.vercel.app/api/generate_stream_key"

# Define query parameters, replace these with actual values
$channel = "mychannel"  # Replace with actual channel name
$uid = "7832468t8"               # Replace with actual user ID
$expiresAfter = 86400                  # Expiration time in seconds (24 hours)

# Construct the full URL with parameters
$fullUrl = "$vercelUrl?channel=$channel&uid=$uid&expiresAfter=$expiresAfter"

# Output the URL to check formatting
Write-Output "Constructed URL: $fullUrl"

# Send GET request and display the response
$response = Invoke-RestMethod -Uri $fullUrl -Method Get
$response | Format-List
