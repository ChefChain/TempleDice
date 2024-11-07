import { MemberItem } from '../../store/AddressStore';
declare const getCursorIndex: () => number | undefined;
declare const getRangeNode: () => Node | null | undefined;
declare const getRangeRect: () => {
    x: number;
    y: number;
};
declare const showAt: () => boolean | null;
declare const getAtUser: () => string | undefined;
declare const createAtButton: (user: MemberItem) => HTMLSpanElement;
declare const replaceString: (raw: string, replacer: string) => string;
declare const replaceAtUser: (user: MemberItem) => void;
export { getCursorIndex, getRangeNode, getRangeRect, showAt, getAtUser, createAtButton, replaceString, replaceAtUser, };
