import { combineReducers } from 'redux';

import userSlide from './userSlide';
import productSlide from './productSlide';
import orderReducer from './orderReducer';
import cartShoppingReducer from './cartShoppingReducer';

const rootReducer = combineReducers({
    userSlide: userSlide,
    productSlide: productSlide,
    orderReducer: orderReducer,
    cartShoppingReducer: cartShoppingReducer,
});

export default rootReducer;
