import React from 'react';
export interface ThreadModalProps {
    className?: string;
    prefix?: string;
    anchorEl?: HTMLElement | null;
    anchorOrigin?: {
        vertical: 'top' | 'center' | 'bottom';
        horizontal: 'left' | 'center' | 'left';
    };
    transformOrigin?: {
        vertical: 'top' | 'center' | 'bottom';
        horizontal: 'left' | 'center' | 'left';
    };
    style?: React.CSSProperties;
    open?: boolean;
    headerContent?: React.ReactNode;
    onClose?: () => void;
    onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClear?: () => void;
    onExited?: () => void;
    children?: React.ReactNode;
}
declare const ThreadModal: (props: ThreadModalProps) => JSX.Element;
export default ThreadModal;
