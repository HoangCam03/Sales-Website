import axios from 'axios';

export const updateOrderStatus = async (id, status) => {
    const token = localStorage.getItem('access_token'); // Lấy token
    const url = `${process.env.REACT_APP_API_URL}/order-product/update-status-order/${id}`;

    try {
        const res = await axios.put(
            url,
            { status }, // Gửi đúng định dạng backend yêu cầu
            {
                headers: {
                    token: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            },
        );

        return res.data; // Trả về dữ liệu phản hồi
    } catch (error) {
        console.error('Error updating order status:', error.response?.data || error.message);
        throw error;
    }
};
