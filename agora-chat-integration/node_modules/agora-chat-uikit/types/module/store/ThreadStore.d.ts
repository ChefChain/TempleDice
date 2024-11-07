import { ChatSDK } from '../SDK';
export interface ThreadData {
    [key: string]: {
        [key: string]: {
            info?: ChatSDK.ThreadChangeInfo & {
                owner?: string;
            };
            originalMessage: ChatSDK.MessageBody;
        };
    };
}
export interface CurrentThread {
    visible: boolean;
    creating: boolean;
    info?: ChatSDK.ThreadChangeInfo & {
        owner?: string;
        members?: string[];
    };
    originalMessage: ChatSDK.MessageBody;
}
declare class ThreadStore {
    rootStore: any;
    thread: ThreadData;
    currentThread: CurrentThread;
    showThreadPanel: boolean;
    threadList: {
        [key: string]: (ChatSDK.ChatThreadDetail & {
            members?: string[];
        })[];
    };
    constructor(rootStore: any);
    setThread(thread: ThreadData): void;
    setCurrentThread(thread: CurrentThread): void;
    setThreadVisible(visible: boolean): void;
    updateThreadInfo(threadInfo: ChatSDK.ThreadChangeInfo): void;
    updateMultiDeviceEvent(msg: any): void;
    getChatThreadDetail(threadId: string): Promise<void>;
    getThreadMembers(parentId: string, threadId: string): Promise<string[]>;
    removeChatThreadMember(parentId: string, threadId: string, userId: string): any;
    joinChatThread(chatThreadId: string): any;
    getGroupChatThreads(parentId: string, cursor?: string): Promise<string | null>;
    clear(): void;
}
export default ThreadStore;
