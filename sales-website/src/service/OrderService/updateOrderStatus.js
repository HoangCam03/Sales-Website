// service/UserService/updateOrderStatus.js
import axios from 'axios';

export const updateOrderStatus = async (id, status) => {
    const token = localStorage.getItem('access_token');
    console.log('Token:', token); // Log token to check
    console.log('id:', id);

    try {
        // API URL including the Order ID
        const url = `${process.env.REACT_APP_API_URL}/order-product/update-status/${id}`;
        console.log('API URL:', url); // Log API URL

        // Send PUT request
        const res = await axios.put(
            url,
            { status },
            {
                headers: {
                    token: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            },
        );

        return res.data; // Return the response data for further handling
    } catch (error) {
        console.error('Error updating order status:', error.response ? error.response.data : error.message);
        throw error; // Throw the error to be handled by the caller
    }
};
