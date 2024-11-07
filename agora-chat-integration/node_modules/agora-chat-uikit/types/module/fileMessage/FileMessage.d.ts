import React from 'react';
import { BaseMessageProps, renderUserProfileProps } from '../baseMessage';
import { IconProps } from '../../component/icon';
import type { FileMessageType } from '../types/messageType';
export interface FileMessageProps extends BaseMessageProps {
    fileMessage: FileMessageType;
    iconType?: IconProps['type'];
    prefix?: string;
    className?: string;
    style?: React.CSSProperties;
    nickName?: string;
    type?: 'primary' | 'secondly';
    renderUserProfile?: (props: renderUserProfileProps) => React.ReactNode;
}
declare const _default: ((props: FileMessageProps) => JSX.Element) & {
    displayName: string;
};
export default _default;
