import React, { useContext } from 'react';
import { AgoraContext } from '../../contexts/AgoraContext';
import './ChatBox.css';
// Import Agora Chat component based on the SDK you're using
// For example, using agora-rtc-react:
import { AgoraChat } from 'agora-rtc-react';

const ChatBox = () => {
  const { agoraCredentials } = useContext(AgoraContext);

  if (!agoraCredentials.token) {
    return <div>Please log in to use the chat.</div>;
  }

  return (
    <div className="chatbox-container">
      <AgoraChat
        appId="YOUR_AGORA_APP_ID"
        channel="YOUR_CHANNEL_NAME"
        token={agoraCredentials.token}
        uid={agoraCredentials.userId}
      />
    </div>
  );
};

export default ChatBox;
