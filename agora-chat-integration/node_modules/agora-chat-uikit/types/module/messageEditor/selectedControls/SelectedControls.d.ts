import React from 'react';
import { ChatSDK } from '../../SDK';
import { CurrentConversation } from '../../store/ConversationStore';
export interface SelectedControlsProps {
    prefix?: string;
    style?: React.CSSProperties;
    className?: string;
    onHide?: () => void;
    conversation?: CurrentConversation;
    onSendMessage?: (message: ChatSDK.CombineMsgBody) => void;
}
declare const SelectedControls: (props: SelectedControlsProps) => JSX.Element;
export { SelectedControls };
