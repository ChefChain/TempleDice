import { ReactNode } from 'react';
export interface ReactionData {
    count: number;
    isAddedBySelf?: boolean;
    reaction: string;
    userList: string[];
    op?: {
        operator: string;
        reactionType: 'create' | 'delete';
    }[];
}
export interface ReactionMessageProps {
    prefixCls?: string;
    className?: string;
    reactionData: ReactionData[];
    direction?: 'ltr' | 'rtl';
    icon?: ReactNode;
    onSelected?: (emojiString: string) => void;
    trigger?: 'click' | 'hover';
    config?: {
        map: any;
        path: string;
    };
    onClick?: (emojiString: string) => void;
    onDelete?: (emojiString: string) => void;
    onShowUserList?: (emojiString: string) => void;
    reactionConfig?: {
        map: {
            [key: string]: HTMLImageElement;
        };
    };
}
declare const ReactionMessage: (props: ReactionMessageProps) => JSX.Element;
export { ReactionMessage };
