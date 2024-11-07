import React from 'react';
import { MemberItem } from '../../store/AddressStore';
export declare const AT_ALL = "ALL";
export interface SuggestListProps {
    visible: boolean;
    style?: React.CSSProperties;
    position: {
        x: number;
        y: number;
    };
    queryString?: string;
    className?: string;
    onPickUser: (user: MemberItem) => void;
    onHide: () => void;
    onShow: () => void;
}
declare const _default: React.FunctionComponent<SuggestListProps>;
export default _default;
