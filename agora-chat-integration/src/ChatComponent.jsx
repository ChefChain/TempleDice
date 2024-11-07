// src/ChatComponent.jsx

import React, { useEffect } from "react";
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

  useEffect(() => {
    const userId = prompt("Please input user ID:");
    const token = "Chat User Temp Token"; // Replace with actual Chat User Temp Token

    if (!userId || !token) {
      alert("User ID and Token are required to login.");
      return;
    }

    client
      .open({
        user: userId,
        agoraToken: token,
      })
      .then(() => {
        console.log("Agora Chat Client opened successfully.");

        // Optionally, add a default conversation
        // Replace 'another_user_id' and 'Another User' with actual user IDs and names
        rootStore.conversationStore.addConversation({
          chatType: "singleChat", // 'singleChat' || 'groupChat'
          conversationId: "another_user_id", // Target user ID or group ID
          name: "Another User", // Target user nickname or group name
          lastMessage: {},
        });
      })
      .catch((error) => {
        console.error("Error opening Agora Chat Client:", error);
        alert("Failed to login. Please check your credentials.");
      });
  }, [client]);

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

// Inline styles for simplicity
const styles = {
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

export default App;
