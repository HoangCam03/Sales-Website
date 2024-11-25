import { combineReducers } from 'redux';

import userSlide from './userSlide';
import productSlide from './productSlide';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
    userSlide: userSlide,
    productSlide: productSlide,
    orderReducer: orderReducer,
});

export default rootReducer;
