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

const ChatApp = ({ sessionTicket, playFabId }) => {
  const client = useClient();

  useEffect(() => {
    // Fetch Agora Chat Token from your server using sessionTicket and playFabId
    // This step assumes you have a server-side endpoint that generates Agora tokens securely
    const fetchAgoraToken = async () => {
      try {
        const response = await fetch('YOUR_SERVER_ENDPOINT/getAgoraToken', { // *** IMPORTANT: Replace with your actual server endpoint ***
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionTicket, playFabId }),
        });

        const data = await response.json();

        if (data.error) {
          console.error("Error fetching Agora Token:", data.error);
          alert("Failed to fetch Agora Token. Please try again.");
          return;
        }

        const { userId, agoraToken } = data;

        if (!userId || !agoraToken) {
          console.error("Invalid Agora Token response:", data);
          alert("Invalid Agora Token response. Please try again.");
          return;
        }

        client
          .open({
            user: userId,
            agoraToken: agoraToken,
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
            alert("Failed to initialize Agora Chat. Please try again.");
          });
      } catch (error) {
        console.error("Error fetching Agora Token:", error);
        alert("Failed to fetch Agora Token. Please try again.");
      }
    };

    if (sessionTicket && playFabId) {
      fetchAgoraToken();
    } else {
      console.error("Missing sessionTicket or playFabId");
      alert("Missing authentication information. Please log in again.");
    }
  }, [client, sessionTicket, playFabId]);

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

const App = ({ sessionTicket, playFabId }) => {
  return (
    <Provider
      initConfig={{
        appKey: appKey,
        host: host,
      }}
    >
      <ChatApp sessionTicket={sessionTicket} playFabId={playFabId} />
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
