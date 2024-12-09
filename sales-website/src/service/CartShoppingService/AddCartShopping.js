import axios from 'axios';

export const addCartShopping = async (data) => {
    const token = localStorage.getItem('access_token');
    console.log('Token:', token); // Log token để kiểm tra

    try {
        const url = `${process.env.REACT_APP_API_URL}/cart-shopping/add-cartshopping`;
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
        // Xử lý lỗi từ backend
        if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message); // Hiển thị lỗi từ backend
        } else {
            alert('Sản phẩm hết hàng'); // Hiển thị lỗi chung nếu không có phản hồi từ backend
        }

        throw error; // Ném lỗi để xử lý ở nơi gọi hàm
    }
};
