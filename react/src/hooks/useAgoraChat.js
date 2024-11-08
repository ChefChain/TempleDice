import { useContext } from 'react';
import { AgoraContext } from '../contexts/AgoraContext';

const useAgoraChat = () => {
  const { agoraCredentials, setAgoraCredentials } = useContext(AgoraContext);

  const initializeAgora = (userId, token) => {
    setAgoraCredentials({ userId, token });
  };

  return { agoraCredentials, initializeAgora };
};

export default useAgoraChat;
