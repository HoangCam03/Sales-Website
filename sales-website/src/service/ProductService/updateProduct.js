// service/UserService/UpdateUser.js
import axios from 'axios';

export const updateProduct = async (id, data) => {
    const token = localStorage.getItem('access_token');
    console.log('Token:', token); // Log token để kiểm tra
    console.log('id', id);

    try {
        // Đường dẫn API bao gồm ID người dùng

        const url = `${process.env.REACT_APP_API_URL}/product/update-product/${id}`;

        console.log('API URL:', url); // Log URL API
        console.log('data:', data);
        const res = await axios.put(url, data, {
            headers: {
                token: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Update response:', res.data);
        return res.data;
    } catch (error) {
        console.error('Error updating user details:', error.response ? error.response.data : error.message);
        throw error; // Ném lỗi lên trên để xử lý ở nơi gọi hàm
    }
};
