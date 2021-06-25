import axios from 'axios';

export const authenticateUser = async (username, password) => {
    const { status } = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, { username, password });
    if (status === 200) return true;
    return false;
}