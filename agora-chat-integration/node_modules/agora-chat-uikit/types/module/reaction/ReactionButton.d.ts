/// <reference types="react" />
export interface ReactionButtonProps {
    prefixCls?: string;
    className?: string;
    count: number;
    isAddedBySelf: boolean;
    reaction: string;
    userList: string[];
    onClick?: (emojiString: string) => void;
    onDelete?: (emojiString: string) => void;
    onShowUserList?: (emojiString: string) => void;
    emojiConfig?: {
        map: {
            [key: string]: HTMLImageElement;
        };
    };
}
declare const ReactionButton: (props: ReactionButtonProps) => JSX.Element | null;
export { ReactionButton };
