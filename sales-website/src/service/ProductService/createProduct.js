import axios from 'axios';

export const createProduct = async (values) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, values);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
