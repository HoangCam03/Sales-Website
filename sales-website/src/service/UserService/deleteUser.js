// service/UserService/deleteUser.js
import axios from 'axios';

export const deleteUser = async (id) => {
    const token = localStorage.getItem('access_token');
    console.log('Token:', token); // Log token to check
    console.log('id:', id);

    try {
        // API URL including the User ID
        const url = `${process.env.REACT_APP_API_URL}/user/delete-User/${id}`;
        console.log('API URL:', url); // Log API URL

        // Send DELETE request
        const res = await axios.delete(url, {
            headers: {
                token: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return res.data; // Return the response data for further handling
    } catch (error) {
        console.error('Error deleting User:', error.response ? error.response.data : error.message);
        throw error; // Throw the error to be handled by the caller
    }
};
