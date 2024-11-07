import React, { ChangeEvent, ReactElement } from 'react';
export interface SwitchProps {
    className?: string;
    style?: React.CSSProperties;
    checked: boolean;
    disabled?: boolean;
    onChange?(e: ChangeEvent<HTMLInputElement>): void;
}
declare const Switch: ({ checked, onChange, disabled, className, style, }: SwitchProps) => ReactElement;
export { Switch };
