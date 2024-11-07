/// <reference types="react" />
export interface MessageStatusProps {
    status: 'received' | 'read' | 'unread' | 'sent' | 'failed' | 'sending' | 'default';
    type?: 'icon' | 'text';
    prefixCls?: string;
    className?: string;
}
declare const MessageStatus: (props: MessageStatusProps) => JSX.Element;
export { MessageStatus };
