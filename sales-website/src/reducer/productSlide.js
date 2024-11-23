// productSlide.js
import { SET_SEARCH_QUERY } from '~/action/types';

const INITIAL_STATE = {
    search: '', // Giá trị tìm kiếm
    products: [], // Danh sách sản phẩm (thêm dữ liệu này nếu chưa có)
};

const productSlide = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_SEARCH_QUERY:
            return {
                ...state,
                search: action.payload, // Cập nhật giá trị tìm kiếm
            };
        // Các case khác (nếu có)
        default:
            return state;
    }
};

export default productSlide;
