// ChatComponent.jsx

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  Provider,
  Chat,
  ConversationList,
  useClient,
  rootStore,
} from "agora-chat-uikit";
import "agora-chat-uikit/style.css";

// Agora Chat Configuration
const appKey = "411225172#1429501"; // Your Agora App Key
const host = "https://msync-api-41.chat.agora.io"; // WebSocket Address

const ChatApp = () => {
  const client = useClient();
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [conversationId, setConversationId] = useState("");
  const [conversationName, setConversationName] = useState("");

  useEffect(() => {
    // Check if credentials are available from main.js
    if (window.agoraCredentials) {
      const { userId, token } = window.agoraCredentials;
      setUserId(userId);
      setToken(token);

      // Optionally, set default conversation
      setConversationId("TempleDiceChannel");
      setConversationName("Temple Dice Chat");

      // Attempt to login
      handleLogin();
    }
  }, []);

  // Function to handle login
  const handleLogin = async () => {
    if (!userId || !token) {
      alert("User ID and Token are required.");
      return;
    }

    try {
      await client.open({
        user: userId,
        agoraToken: token,
      });
      console.log("Agora Chat Client opened successfully.");

      // Optionally, add a default conversation
      if (conversationId && conversationName) {
        rootStore.conversationStore.addConversation({
          chatType: "groupChat", // 'singleChat' || 'groupChat'
          conversationId: conversationId, // target user id or group id
          name: conversationName, // target user nickname or group name
          lastMessage: {},
        });
      }

      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error opening Agora Chat Client:", error);
      alert("Failed to login to Agora Chat. Please check your credentials.");
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={styles.loginContainer}>
        <h2>Loading Agora Chat...</h2>
      </div>
    );
  }

  return (
    <div style={styles.chatContainer}>
      <div style={styles.conversationList}>
        <ConversationList />
      </div>
      <div style={styles.chatBox}>
        <Chat />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Provider
      initConfig={{
        appKey: appKey,
        host: host,
      }}
    >
      <ChatApp />
    </Provider>
  );
};

// Styles for the component
const styles = {
  loginContainer: {
    width: "400px",
    margin: "100px auto",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  chatContainer: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  conversationList: {
    width: "300px",
    borderRight: "1px solid #ccc",
    overflowY: "auto",
  },
  chatBox: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
};

// Function to render the React component into a specified container
window.renderChatComponent = function (containerId) {
  ReactDOM.render(<App />, document.getElementById(containerId));
};

export default App;
