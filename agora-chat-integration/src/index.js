// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import ChatComponent from './ChatComponent'; // Your chat component

// Expose the initChat function globally
window.AgoraChatIntegration = {
    initChat: function({ sessionTicket, playFabId, chatContainerId }) {
        ReactDOM.render(
            <ChatComponent sessionTicket={sessionTicket} playFabId={playFabId} />,
            document.getElementById(chatContainerId)
        );
    }
};

// Optional: Log to verify that AgoraChatIntegration is defined
console.log('AgoraChatIntegration:', window.AgoraChatIntegration);
