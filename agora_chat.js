// agora_chat.js

let loginButton = document.getElementById("loginButton");
let chatContainer = document.getElementById("chatContainer");

loginButton.addEventListener("click", async () => {
    try {
        // Perform login using the existing PlayFab login endpoint
        const response = await fetch("https://templedice.vercel.app/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "custom_id": "uniqueUserId123" })
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Login successful", data);
            // Hide the login button and show the chat container
            loginButton.style.display = "none";
            chatContainer.style.display = "block";

            // Initialize Agora chat
            initializeAgoraChat();
        } else {
            console.error("Login failed", data);
            alert("Login failed: " + data.error);
        }
    } catch (error) {
        console.error("An error occurred during login", error);
        alert("An error occurred during login");
    }
});

function initializeAgoraChat() {
    const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    const appID = "YOUR_AGORA_APP_ID";  // Replace with your Agora App ID
    const channelName = "testChannel";  // Replace with your desired channel
    const token = null;  // Replace with a valid token if required

    client.init(appID, () => {
        console.log("AgoraRTC client initialized");

        client.join(token, channelName, null, (uid) => {
            console.log("User " + uid + " join channel successfully");
            // After joining, you can start interacting with the chat here
            // Example: display a message in the chat container
            let chatDiv = document.getElementById("chat");
            chatDiv.innerHTML = "<p>Welcome to the Agora Chat, user " + uid + "!</p>";
        }, (err) => {
            console.error("Failed to join channel", err);
        });
    }, (err) => {
        console.error("AgoraRTC client init failed", err);
    });
}
