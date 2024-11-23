import axios from 'axios';

export const getDetailProduct = async (id) => {
    console.log('id:', id);
    const url = `${process.env.REACT_APP_API_URL}/product/get-product-detail/${id}`;
    try {
        const response = await axios.get(url); // Gọi API với URL đã được xây dựng
        console.log('API URL:', url); // Log đúng URL
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        // Nếu có lỗi, ném lỗi về
        throw error.response ? error.response.data : error.message;
    }
};
