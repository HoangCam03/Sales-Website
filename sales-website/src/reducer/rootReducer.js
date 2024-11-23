import { combineReducers } from 'redux';

import userSlide from './userSlide';
import productSlide from './productSlide';

const rootReducer = combineReducers({
    userSlide: userSlide,
    productSlide: productSlide,
});

export default rootReducer;
