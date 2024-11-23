import axios from 'axios';

export const getDetailUser = async (id) => {
    const token = localStorage.getItem('access_token');

    if (!token) {
        console.error('Token is missing');
        return;
    }

    try {
        console.log('Fetching user details for ID:', id);
        console.log('Using token:', token);

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/get-details/${id}`, {
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

            // Đảm bảo isAdmin được truyền đúng
            const processedData = {
                ...userData,
                isAdmin: Boolean(userData.isAdmin), // Chuyển đổi sang boolean
            };

            console.log('Processed user data:', processedData);
            return {
                status: 'OK',
                data: processedData,
            };
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
