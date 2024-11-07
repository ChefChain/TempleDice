import { ReactElement, MouseEvent } from 'react';
export interface MenuItemProps {
    className?: string;
    disabled?: boolean;
    children?: ReactElement;
    onClick: (e: MouseEvent) => void;
}
declare const MenuItem: ({ className, disabled, children, onClick, }: MenuItemProps) => JSX.Element;
export { MenuItem };
