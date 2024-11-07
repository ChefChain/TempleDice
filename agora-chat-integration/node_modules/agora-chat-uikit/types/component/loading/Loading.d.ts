import React from 'react';
export interface LoadingProps {
    prefix?: string;
    className?: string;
    style?: React.CSSProperties;
    visible?: boolean;
    size?: number;
}
declare const Loading: (props: LoadingProps) => JSX.Element;
export { Loading };
