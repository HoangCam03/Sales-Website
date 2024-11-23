import axios from 'axios';

export const getAllUser = async () => {
    const token = localStorage.getItem('access_token');

    if (!token) {
        console.error('Token is missing');
        return;
    }

    try {
        console.log('Using token:', token);

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/getalluser`, {
            headers: {
                token: `Bearer ${token}`,
            },
        });

        // Log response để debug
        console.log('API Response:', res.data);

        // Kiểm tra và xử lý dữ liệu
        if (res.data && res.data.status === 'OK') {
            const userData = res.data.data;
            console.log('User data received:', userData);
        }

        return res.data;
    } catch (error) {
        console.error('Error in getDetailUser:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
        });
        throw error;
    }
};
