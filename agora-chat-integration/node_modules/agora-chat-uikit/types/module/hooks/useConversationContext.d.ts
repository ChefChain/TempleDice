declare const useConversationContext: () => {
    currentConversation: import("..").CurrentConversation;
    conversationList: import("..").Conversation[];
    setCurrentConversation: (currentCvs: import("..").CurrentConversation) => void;
    deleteConversation: (conversation: import("..").CurrentConversation) => void;
    topConversation: (conversation: import("..").Conversation) => void;
    addConversation: (conversation: import("..").Conversation) => void;
    modifyConversation: (conversation: import("..").Conversation) => void;
};
export { useConversationContext };
