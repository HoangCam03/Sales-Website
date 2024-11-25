import axios from 'axios';

export const getOrders = async (id) => {
    const token = localStorage.getItem('access_token');

    if (!token) {
        console.error('Token is missing');
        return;
    }

    try {
        console.log('Fetching user details for ID:', id);
        console.log('Using token:', token);

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/order-product/get-orders-detail/${id}`, {
            headers: {
                token: `Bearer ${token}`,
            },
        });

        // Log response để debug
        console.log('API Response:', res.data);

        // Kiểm tra và xử lý dữ liệu
        if (res.data && res.data.status === 'OK') {
            const orderData = res.data.data;
            console.log('User data received:', orderData);
        }

        return res.data;
    } catch (error) {
        console.error('Error in getOrders:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
        });
        throw error;
    }
};
