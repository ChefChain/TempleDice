import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AgoraProvider } from './contexts/AgoraContext';
import './styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <AgoraProvider>
      <App />
    </AgoraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
