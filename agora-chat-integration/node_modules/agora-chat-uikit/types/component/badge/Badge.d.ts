import React from 'react';
export interface BadgeProps {
    /** Number to show in badge */
    count?: React.ReactNode;
    /** Max count to show */
    overflowCount?: number;
    /** Whether to show red dot without number */
    dot?: boolean;
    showZero?: boolean;
    style?: React.CSSProperties;
    className?: string;
    text?: React.ReactNode;
    size?: 'default' | 'small';
    offset?: [number | string, number | string];
    title?: string;
    children?: React.ReactNode;
    scrollNumberPrefixCls?: string;
    prefixCls?: string;
    color?: string;
}
export declare const Badge: ({ count, overflowCount, dot, showZero, style, className, text, size, offset, title, children, color, scrollNumberPrefixCls, prefixCls, ...restProps }: BadgeProps) => JSX.Element;
