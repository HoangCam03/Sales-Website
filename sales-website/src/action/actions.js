import { UPDATE, LOGOUT, RESTORE, UPDATE_INFO, SET_SEARCH_QUERY } from './types';

// actions.js///ban đầu đang không có gì
export const updateUser = (_id, name, email, access_token, phone, confirmPassword, address, avatar, isAdmin) => {
    console.log('isAdmin in updateUser:', isAdmin); // Kiểm tra giá trị
    const userData = {
        _id,
        name,
        email,
        access_token,
        phone,
        confirmPassword,
        address,
        avatar,
        isAdmin: Boolean(isAdmin), // Đảm bảo giá trị boolean
        isLoggedIn: true,
    };
    localStorage.setItem('user', JSON.stringify(userData));
    return {
        type: UPDATE,
        payload: userData,
    };
};

export const logoutUser = () => {
    localStorage.removeItem('user'); // Xóa dữ liệu trong localStorage
    return {
        type: LOGOUT,
    };
};

export const restoreUser = (userData) => {
    return {
        type: RESTORE,
        payload: userData,
    };
};
export const UpdateUserInfo = (userData) => {
    return {
        type: UPDATE_INFO,
        payload: userData,
    };
};

export const setSearchQuery = (query) => ({
    type: SET_SEARCH_QUERY,
    payload: query,
});
