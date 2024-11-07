import MessageStore, { RecallMessage, Message, SelectedMessage, Typing } from './MessageStore';
import ConversationStore, { AT_TYPE, Conversation, CurrentConversation, ById } from './ConversationStore';
import AddressStore, { MemberRole, MemberItem, GroupItem, AppUserInfo } from './AddressStore';
import ThreadStore, { ThreadData, CurrentThread } from './ThreadStore';
import { ChatSDK } from 'module/SDK';
interface InitConfig {
    appKey: string;
}
declare class RootStore {
    messageStore: MessageStore;
    conversationStore: ConversationStore;
    addressStore: AddressStore;
    threadStore: ThreadStore;
    client: ChatSDK.Connection;
    loginState: boolean;
    initConfig: {
        appKey: string;
    };
    constructor();
    setClient(client: ChatSDK.Connection): void;
    setLoginState(state: boolean): void;
    setInitConfig(initConfig: InitConfig): void;
    clear(): void;
}
export declare function getStore(): RootStore;
declare const rootStore: RootStore;
export type { RootStore, InitConfig, MessageStore, RecallMessage, Message, SelectedMessage, Typing, ConversationStore, AT_TYPE, Conversation, CurrentConversation, ById, AddressStore, MemberRole, MemberItem, GroupItem, AppUserInfo, ThreadStore, ThreadData, CurrentThread, };
export default rootStore;
