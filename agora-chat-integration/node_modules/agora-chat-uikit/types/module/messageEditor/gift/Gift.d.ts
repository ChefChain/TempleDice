import React, { ReactNode } from 'react';
export interface GiftProps {
    prefix?: string;
    className?: string;
    style?: React.CSSProperties;
    image?: ReactNode | string;
    title?: string;
    titleIcon?: ReactNode;
    subTitle?: string | number;
    subTitleIcon?: ReactNode;
    selected?: boolean;
    action?: {
        visible: boolean;
        text: string;
        onClick?: () => void;
    };
    giftId: string | number;
    onClick?: (giftId: string | number) => void;
}
declare const Gift: (props: GiftProps) => JSX.Element;
export { Gift };
