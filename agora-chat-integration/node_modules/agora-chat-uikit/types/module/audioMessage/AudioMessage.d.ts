import React from 'react';
import { BaseMessageProps, renderUserProfileProps } from '../baseMessage';
import type { AudioMessageType } from '../types/messageType';
export interface AudioMessageProps extends Omit<BaseMessageProps, 'bubbleType'> {
    audioMessage: AudioMessageType;
    prefix?: string;
    style?: React.CSSProperties;
    className?: string;
    nickName?: string;
    type?: 'primary' | 'secondly';
    renderUserProfile?: (props: renderUserProfileProps) => React.ReactNode;
    onlyContent?: boolean;
}
declare const _default: ((props: AudioMessageProps) => JSX.Element) & {
    displayName: string;
};
export default _default;
