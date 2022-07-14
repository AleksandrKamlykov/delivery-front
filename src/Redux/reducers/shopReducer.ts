const initialState: { shopId: number | undefined; } = {
    shopId: undefined
};

export const shopReducer = (state = initialState, action: any) => {

    switch (action.type) {
        case 'CHOOSE':
            return { ...state, shopId: action.payload };
        default:
            return state;
    }

};