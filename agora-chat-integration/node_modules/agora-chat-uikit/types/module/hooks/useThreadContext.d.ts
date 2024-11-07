declare const useThreadContext: () => {
    currentThread: import("..").CurrentThread;
    threadList: {
        [key: string]: (import("agora-chat").AgoraChat.ChatThreadDetail & {
            members?: string[] | undefined;
        })[];
    };
    threadVisible: boolean;
    setCurrentThread: (thread: import("..").CurrentThread) => void;
    setThreadVisible: (visible: boolean) => void;
    getGroupChatThreads: (parentId: string, cursor?: string | undefined) => Promise<string | null>;
    getThreadMembers: (parentId: string, threadId: string) => Promise<string[]>;
    removeChatThreadMember: (parentId: string, threadId: string, userId: string) => any;
    getCurrentChatThreadDetail: (threadId: string) => Promise<void>;
};
export { useThreadContext };
