import React, { createContext, useState } from 'react';

export const AgoraContext = createContext();

export const AgoraProvider = ({ children }) => {
  const [agoraCredentials, setAgoraCredentials] = useState({
    userId: '',
    token: '',
  });

  return (
    <AgoraContext.Provider value={{ agoraCredentials, setAgoraCredentials }}>
      {children}
    </AgoraContext.Provider>
  );
};
