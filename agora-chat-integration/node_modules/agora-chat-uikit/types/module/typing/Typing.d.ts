import React from 'react';
import { CurrentConversation } from '../store/ConversationStore';
export interface TypingProps {
    prefix?: string;
    className?: string;
    style?: React.CSSProperties;
    onHide?: () => void;
    onShow?: () => void;
    conversation: CurrentConversation;
}
declare const _default: ((props: TypingProps) => JSX.Element) & {
    displayName: string;
};
export default _default;
