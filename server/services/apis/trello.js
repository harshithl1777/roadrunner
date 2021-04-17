const axios = require('axios');

const gatherList = (listID) => {
    axios.get(`https://api.trello.com/1/lists/${listID}/cards`, {
        params: {
            id: listID,
            key: process.env.TRELLO_API_KEY,
            token: process.env.DEV_TOKEN,
        }
    })
    .then(({ data }) => {
        console.log(data);
        return data;
    })
    .catch(err => console.log(err));
}

const createWebhook = (token, modelID) => {
    axios.post('https://api.trello.com/1/webhooks', {
        key: process.env.TRELLO_API_KEY,
        token,
        description: 'test webhook 1',
        callbackURL: `${process.env.API_URL}/api/webhooks`,
        idModel: modelID,
    })
    .then(() => {
        res.status(201).send('Success');
    })
    .catch(err => console.log(err));
}

module.exports = {
    gatherList,
};
