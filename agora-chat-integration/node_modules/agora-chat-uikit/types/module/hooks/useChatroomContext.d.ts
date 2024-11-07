declare const useChatroomContext: () => {
    chatroom: import("../store/AddressStore").ChatroomInfo[];
    muteChatRoomMember: (chatroomId: string, userId: string, muteDuration?: number | undefined) => Promise<void>;
    unmuteChatRoomMember: (chatroomId: string, userId: string) => Promise<void>;
    removerChatroomMember: (chatroomId: string, userId: string) => void;
};
export { useChatroomContext };
