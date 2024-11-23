import axios from 'axios';

export const getProductsByType = async (type, search, limit = 10, page = 0) => {
    try {
        const url =
            search && search.length > 0
                ? `${process.env.REACT_APP_API_URL}/product/get-products-by-type?type=${encodeURIComponent(
                      type,
                  )}&filter=${encodeURIComponent(JSON.stringify(search))}&limit=${limit}&page=${page}`
                : `${process.env.REACT_APP_API_URL}/product/get-products-by-type?type=${encodeURIComponent(
                      type,
                  )}&limit=${limit}&page=${page}`;

        console.log('API URL', url); // Thêm dòng này để kiểm tra URL
        const response = await axios.get(url);
        return response.data; // Trả về dữ liệu sản phẩm
    } catch (error) {
        console.error('Error fetching products by type:', error);
        throw error.response ? error.response.data : error; // Xử lý lỗi
    }
};
