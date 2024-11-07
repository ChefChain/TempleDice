import React from 'react';
export interface CollapseProps {
    title?: React.ReactNode | (() => React.ReactNode);
    content?: React.ReactNode | (() => React.ReactNode);
    className?: string;
    style?: React.CSSProperties;
    prefix?: string;
    direction?: 'left' | 'right' | 'up' | 'down';
    bordered?: boolean;
    onChange?: (isOpen: boolean) => void;
    expandIcon?: React.ReactNode;
    expandIconPosition?: 'start' | 'end';
    collapsible?: 'header' | 'icon' | 'disabled';
}
declare const Collapse: (props: CollapseProps) => JSX.Element;
export default Collapse;
