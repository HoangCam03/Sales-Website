// reducers/orderReducer.js
import { SET_ORDER, CLEAR_ORDER, SET_ORDERS, UPDATE_ORDER_STATUS } from '~/action/types';

const initialState = {
    currentOrder: null,
    orders: [],
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDER:
            return { ...state, currentOrder: action.payload };
        case CLEAR_ORDER:
            return { ...state, currentOrder: null };
        case SET_ORDERS:
            return { ...state, orders: action.payload };
        case UPDATE_ORDER_STATUS:
            return {
                ...state,
                orders: state.orders.map((order) =>
                    order._id === action.payload.id ? { ...order, status: action.payload.status } : order,
                ),
            };
        default:
            return state;
    }
};

export default orderReducer;
