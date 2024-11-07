// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import ChatComponent from "./ChatComponent";

// Function to render the React Chat component into a specified container
window.renderChatComponent = function (userId, agoraToken) {
  ReactDOM.render(
    <ChatComponent userId={userId} agoraToken={agoraToken} />,
    document.getElementById("react-chat")
  );
};
