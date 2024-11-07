// agora_chat.js

let loginButton = document.getElementById("loginButton");
let chatContainer = document.getElementById("chatContainer");

// Create input fields for username and password
document.body.insertAdjacentHTML('afterbegin', `
    <div id="loginContainer">
        <input type="text" id="username" placeholder="Username/Email" />
        <input type="password" id="password" placeholder="Password" />
    </div>
`);

loginButton.addEventListener("click", async () => {
    try {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }

        if (username.length <= 4) {
            alert("Username must be longer than 4 characters.");
            return;
        }

        if (password.length <= 4) {
            alert("Password must be longer than 4 characters.");
            return;
        }

        // Add a salt to the password
        const salt = "someRandomSaltValue";  // Replace with a unique salt for each user ideally
        const saltedPassword = password + salt;

        // Hash the salted password (using SHA-256)
        const hashedPassword = await sha256(saltedPassword);

        // Create a custom_id using the username and hashed password
        const customId = `${username}:${hashedPassword}`;

        // Perform login using the existing PlayFab login endpoint
        const response = await fetch("https://templedice.vercel.app/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "custom_id": customId, "CreateAccount": false })
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

// Function to hash the password using SHA-256
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

async function initializeAgoraChat() {
    if (typeof AgoraRTC === 'undefined') {
        alert("AgoraRTC SDK is not loaded. Please check the script tag for AgoraRTC.");
        return;
    }

    const appID = "32db6cb30a5541869bcb2774afd10fd4";  // Your Agora App ID
    const channelName = "TempleDice";  // Replace with your desired channel name
    const uid = Math.floor(Math.random() * 100000); // Generate a random user ID

    // Fetch the token from your server
    let token;
    try {
        const response = await fetch(`https://templedice.vercel.app/api/getToken?channel=${channelName}&uid=${uid}&role=publisher`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        if (response.ok) {
            token = data.token;
        } else {
            console.error("Failed to fetch token", data);
            alert("Failed to fetch token: " + data.error);
            return;
        }
    } catch (error) {
        console.error("An error occurred while fetching the token", error);
        alert("An error occurred while fetching the token");
        return;
    }

    // Initialize Agora client
    const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

    client.join(appID, channelName, token, uid).then((uid) => {
        console.log("User " + uid + " joined the channel successfully");
        
        // Initialize Agora Chat SDK
        initializeAgoraChatSDK(uid);
    }).catch((err) => {
        console.error("Failed to join channel", err);
        alert("Failed to join channel: " + err.message);
    });
}

function initializeAgoraChatSDK(uid) {
    const appKey = "411225172#1429501";  // Your Agora Chat AppKey
    const userId = `user_${uid}`;
    const agoraChatToken = "YOUR_CHAT_USER_TOKEN_HERE";  // Replace with a valid chat user token

    const conn = new WebIM.connection({
        appKey: appKey,
        isMultiLoginSessions: true,
        https: true,
        isAutoLogin: true,
        heartBeatWait: 4500,
        autoReconnectNumMax: 2,
        autoReconnectInterval: 2,
        apiUrl: "https://a41.chat.agora.io"
    });

    conn.open({
        user: userId,
        accessToken: agoraChatToken
    });

    conn.listen({
        onConnected: function () {
            console.log("Agora Chat connected successfully");
            // Show chat UI or initialize chat messages here
        },
        onDisconnected: function () {
            console.log("Agora Chat disconnected");
        },
        onTextMessage: function (message) {
            console.log("New message: ", message);
            let chatDiv = document.getElementById("chat");
            chatDiv.innerHTML += `<p>${message.from}: ${message.data}</p>`;
        }
    });
}
