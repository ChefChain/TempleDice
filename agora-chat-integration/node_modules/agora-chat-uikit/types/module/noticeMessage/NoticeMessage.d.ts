import React from 'react';
import type { RecallMessage } from '../store/MessageStore';
export interface NoticeMessageProps {
    prefix?: string;
    className?: string;
    noticeMessage: {
        message: string;
        time: number;
    } | RecallMessage;
    style?: React.CSSProperties;
}
declare const NoticeMessage: (props: NoticeMessageProps) => JSX.Element;
export { NoticeMessage };
