import { UPDATE, LOGOUT, RESTORE, UPDATE_INFO } from '../action/types';

const INITIAL_STATE = {
    _id: '',
    name: '',
    email: '',
    access_token: '',
    phone: '',
    confirmPassword: '',
    address: '',
    avatar: '',
    isLoggedIn: false,
    isAdmin: false, // Thêm trường isAdmin
};

const userSlide = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE:
            console.log('UPDATE Action Payload:', action.payload); // Kiểm tra dữ liệu
            return {
                ...state,
                ...action.payload,
                isLoggedIn: true,
            };

        case RESTORE:
            console.log('RESTORE Action Payload:', action.payload); // Kiểm tra dữ liệu
            return {
                ...state,
                ...action.payload,
                isLoggedIn: !!action.payload.access_token,
            };

        case UPDATE_INFO:
            console.log('UPDATE_INFO Action Payload:', action.payload); // Kiểm tra dữ liệu
            return {
                ...state,
                ...action.payload,
                isLoggedIn: true,
            };

        case LOGOUT:
            return INITIAL_STATE;

        default:
            return state;
    }
};

export default userSlide;
