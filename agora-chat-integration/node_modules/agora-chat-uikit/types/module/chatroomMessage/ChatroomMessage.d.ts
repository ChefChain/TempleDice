import { ReactNode } from 'react';
import { ChatSDK } from '../SDK';
export interface ChatroomMessageProps {
    prefix?: string;
    className?: string;
    label?: string;
    prefixIcon?: ReactNode;
    avatar?: ReactNode;
    nickname?: string;
    content?: ReactNode;
    message: ChatSDK.MessageBody;
    targetLanguage?: string;
    onReport?: (message: ChatSDK.MessageBody) => void;
}
declare const _default: ((props: ChatroomMessageProps) => JSX.Element) & {
    displayName: string;
};
export default _default;
