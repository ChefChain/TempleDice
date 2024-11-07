import React, { ReactElement } from 'react';
export interface PopoverProps {
    children?: string;
    className?: string;
    style?: React.CSSProperties;
}
declare const Popover: ({ className, children, style }: PopoverProps) => ReactElement;
export { Popover };
