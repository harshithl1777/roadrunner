import axios from 'axios';

export const retrieveWebhooks = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/webhooks`);
    return data.data;
}

export const createWebhook = async (email, modelID, webhookData) => {
    const { status } = await axios.post(`${process.env.REACT_APP_API_URL}/api/webhooks`, { email, modelID, webhookData });
    return status;
}

export const deleteWebhooks = async (email, ids) => {
    const { status } = await axios.delete(`${process.env.REACT_APP_API_URL}/api/webhooks`, {
        data: { ids, email }
    });
    return status;
}