import React from 'react';
export interface BroadcastProps {
    prefix?: string;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    prefixIcon?: React.ReactNode;
    suffixIcon?: React.ReactNode;
    loop?: number;
    delay?: number;
    speed?: number;
    direction?: 'left' | 'right' | 'up' | 'down';
    play?: boolean;
    pauseOnHover?: boolean;
    onFinish?: () => void;
    onCycleComplete?: () => void;
}
declare const Broadcast: (props: BroadcastProps) => JSX.Element;
export { Broadcast };
