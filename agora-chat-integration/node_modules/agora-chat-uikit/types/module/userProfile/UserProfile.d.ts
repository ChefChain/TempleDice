import React from 'react';
export interface UserProfileProps {
    prefix?: string;
    className?: string;
    style?: React.CSSProperties;
    userId: string;
}
declare const _default: ((props: UserProfileProps) => JSX.Element) & {
    displayName: string;
};
export default _default;
