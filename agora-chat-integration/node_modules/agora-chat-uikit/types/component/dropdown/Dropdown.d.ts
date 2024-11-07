import React, { ReactElement } from 'react';
export interface DropdownProps {
    className?: string;
    style?: React.CSSProperties;
    children: ReactElement;
    menu: ReactElement[];
    isOpen?: boolean;
}
declare const Dropdown: ({ children, className, menu, isOpen, style }: DropdownProps) => JSX.Element;
export { Dropdown };
