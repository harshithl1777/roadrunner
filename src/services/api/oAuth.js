import axios from 'axios';

export const getTokens = async (email) => {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/tokens`, { email });
    return data.data;
}

export const sendTrelloToken = async (email, token) => {
    const { status } = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/tokens/trello`, { email, token });
    return status;
}

export const generateGoogleAuthURL = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/oauth/google`);
    return data.authURL;
}

export const sendGoogleAuthCode = async (email, code) => {
    const { status } = await axios.post(`${process.env.REACT_APP_API_URL}/api/oauth/google`, { email, code });
    return status;
}

export const deleteTokens = async (service) => {
    const { status } = await axios.delete(`${process.env.REACT_APP_API_URL}/api/auth/tokens?service=${service}`);
    return status;
}