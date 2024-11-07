declare const gift: {
    gifts: ({
        giftId: string;
        giftIcon: string;
        giftName: string;
        giftPrice: string;
        giftEffect?: undefined;
        effectMD5?: undefined;
    } | {
        giftId: string;
        giftIcon: string;
        giftEffect: string;
        giftName: string;
        giftPrice: string;
        effectMD5: string;
    })[];
};
export default gift;
