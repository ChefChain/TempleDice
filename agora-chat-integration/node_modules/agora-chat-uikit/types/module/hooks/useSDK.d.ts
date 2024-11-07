declare const useSDK: () => {
    AgoraRTC: any;
    ChatSDK: import("agora-chat").AgoraChatStatic;
};
export { useSDK };
