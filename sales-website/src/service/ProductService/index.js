import axios from 'axios';

export const getAllProduct = async (search, limit, page) => {
    console.log('search', search);
    console.log('limit', limit);
    console.log('page', page);

    try {
        const url =
            search && search.length > 0
                ? `${process.env.REACT_APP_API_URL}/product/getallproduct?filter=${encodeURIComponent(
                      JSON.stringify(search),
                  )}&limit=${limit}&page=${page}`
                : `${process.env.REACT_APP_API_URL}/product/getallproduct?limit=${limit}&page=${page}`; // Nếu không có tìm kiếm, lấy tất cả sản phẩm

        console.log('API URL', url); // Thêm dòng này để kiểm tra URL
        const response = await axios.get(url);
        return response.data; // Trả về dữ liệu sản phẩm
    } catch (error) {
        throw error.response.data; // Xử lý lỗi
    }
};
