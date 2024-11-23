// service/OrderService/createOrder.js
import axios from 'axios';

export const createOrder = async (data) => {
    const token = localStorage.getItem('access_token');
    console.log('Token:', token); // Log token để kiểm tra

    try {
        const url = `${process.env.REACT_APP_API_URL}/order-product/create`;
        console.log('API URL:', url); // Log URL API
        console.log('data:', data);
        const res = await axios.post(url, data, {
            headers: {
                token: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        console.log('Create order response:', res.data);
        return res.data;
    } catch (error) {
        console.error('Error creating order:', error.response ? error.response.data : error.message);
        throw error; // Ném lỗi lên trên để xử lý ở nơi gọi hàm
    }
};
