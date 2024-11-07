import React, { FC, ReactNode } from 'react';
export interface EmptyProps {
    className?: string;
    style?: React.CSSProperties;
    prefix?: string;
    text?: ReactNode;
    icon?: ReactNode;
}
declare const Empty: FC<EmptyProps>;
export { Empty };
