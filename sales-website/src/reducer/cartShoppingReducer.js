import { SET_CARTSHOPPING } from '~/action/types';

const initialState = {
    currentOrder: null,
    orders: [],
};

const cartShoppingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CARTSHOPPING:
            return { ...state, orders: action.payload };
        default:
            return state;
    }
};

export default cartShoppingReducer;
