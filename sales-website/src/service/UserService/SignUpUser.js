import axios from 'axios';
export const SignUpUser = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/sign-up`,
        data, // Gửi dữ liệu email và password trong phần body của request
    );
    console.log('Route SignUp------>', res);
    return res.data;
};
