import axios from 'axios';

export const loginUser = async (values) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, values);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
