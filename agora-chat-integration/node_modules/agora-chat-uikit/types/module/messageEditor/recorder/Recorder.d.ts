import React from 'react';
import { ChatSDK } from '../../SDK';
import { CurrentConversation } from '../../store/ConversationStore';
export interface RecorderProps {
    prefix?: string;
    className?: string;
    style?: React.CSSProperties;
    iconStyle?: React.CSSProperties;
    liveContentStyle?: React.CSSProperties;
    cancelBtnShape?: 'circle' | 'square';
    onShow?: () => void;
    onHide?: () => void;
    onSend?: (message: ChatSDK.MessageBody) => void;
    conversation?: CurrentConversation;
    onBeforeSendMessage?: (message: ChatSDK.MessageBody) => Promise<CurrentConversation | void>;
    isChatThread?: boolean;
}
declare const Recorder: React.FC<RecorderProps>;
export { Recorder };
