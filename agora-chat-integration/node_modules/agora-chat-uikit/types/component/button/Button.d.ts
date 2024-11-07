import React from 'react';
declare const buttonShapes: ["circle", "round", "default"];
export declare type ButtonShape = typeof buttonShapes[number];
declare const buttonSizes: ["small", "medium", "large"];
export declare type ButtonSize = typeof buttonSizes[number];
declare const buttonTypes: ["primary", "default", "ghost", "text"];
export declare type ButtonType = typeof buttonTypes[number];
export interface ButtonProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    type?: ButtonType;
    shape?: ButtonShape;
    size?: ButtonSize;
    disabled?: boolean;
    icon?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLElement>;
}
export declare const Button: ({ className, type, size, shape, disabled, icon, children, style, onClick, }: ButtonProps) => JSX.Element;
export {};
