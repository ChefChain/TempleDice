import React, { ReactElement } from 'react';
export interface MenuWrapProps {
    className?: string;
    children: ReactElement;
    containerRef: React.RefObject<HTMLDivElement>;
    onClose: () => void;
}
declare const MenuWrap: ({ className, children, containerRef, onClose, }: MenuWrapProps) => JSX.Element;
export { MenuWrap };
