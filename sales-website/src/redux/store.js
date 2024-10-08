import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducer/rootReducer';

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production', // Tự động kích hoạt DevTools khi không ở môi trường production
});
export default store;
