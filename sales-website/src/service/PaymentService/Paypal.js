import axios from 'axios';

export const getConfig = async () => {
    try {
        const url = `${process.env.REACT_APP_API_URL}/payment/config`;

        const res = await axios.get(url);
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
