import React from 'react';
import { BaseMessageProps, renderUserProfileProps } from '../baseMessage';
import type { ImageMessageType } from '../types/messageType';
export interface ImageMessageProps extends BaseMessageProps {
    imageMessage: ImageMessageType;
    prefix?: string;
    style?: React.CSSProperties;
    className?: string;
    type?: 'primary' | 'secondly';
    onClickImage?: (url: string) => void;
    nickName?: string;
    renderUserProfile?: (props: renderUserProfileProps) => React.ReactNode;
}
export interface ImagePreviewProps {
    visible: boolean;
    previewImageUrl: string;
    alt?: string;
    onCancel?: () => void;
}
export declare const ImagePreview: (props: ImagePreviewProps) => JSX.Element;
declare const _default: ((props: ImageMessageProps) => JSX.Element) & {
    displayName: string;
};
export default _default;
