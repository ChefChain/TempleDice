// agora_chat.js

let loginButton = document.getElementById("loginButton");
let chatContainer = document.getElementById("chatContainer");

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

        if (username.length <= 4 || password.length <= 4) {
            alert("Username and password must be longer than 4 characters.");
            return;
        }

        const salt = "someRandomSaltValue";
        const saltedPassword = password + salt;
        const hashedPassword = await sha256(saltedPassword);
        const customId = `${username}:${hashedPassword}`;

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
            loginButton.style.display = "none";
            chatContainer.style.display = "block";
            initializeAgoraChat();
        } else {
            alert("Login failed: " + data.error);
        }
    } catch (error) {
        alert("An error occurred during login");
    }
});

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

async function initializeAgoraChat() {
    if (typeof AgoraRTC === 'undefined') {
        alert("AgoraRTC SDK is not loaded.");
        return;
    }

    const appID = "32db6cb30a5541869bcb2774afd10fd4";
    const channelName = "TempleDice";
    const uid = Math.floor(Math.random() * 100000);

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
            alert("Failed to fetch token: " + data.error);
            return;
        }
    } catch (error) {
        alert("An error occurred while fetching the token");
        return;
    }

    const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    client.join(appID, channelName, token, uid).then((uid) => {
        console.log("User " + uid + " joined the channel successfully");
        initializeAgoraChatSDK(uid);
    }).catch((err) => {
        alert("Failed to join channel: " + err.message);
    });
}

function initializeAgoraChatSDK(uid) {
    const appKey = "411225172#1429501";
    const userId = `user_${uid}`;
    const agoraChatToken = "YOUR_CHAT_USER_TOKEN_HERE";

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
            document.getElementById("sendMessageButton").addEventListener("click", () => {
                const message = document.getElementById("messageInput").value;
                if (message.trim() !== "") {
                    const id = conn.getUniqueId();
                    const msg = new WebIM.message("txt", id);
                    msg.set({
                        msg: message,
                        to: channelName,
                        roomType: false,
                        success: function () {
                            document.getElementById("chat").innerHTML += `<p>Me: ${message}</p>`;
                            document.getElementById("messageInput").value = "";
                        }
                    });
                    conn.send(msg.body);
                }
            });
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
