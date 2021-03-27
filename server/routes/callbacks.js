const express = require('express');
const axios = require('axios');
const app = module.exports = express();

app.post('/webhook', ({ body }, res) => {
    console.log(body.action.data);
});

app.head('/webhook', ({ query }, res) => {
    res.status(200).send('Ready for webhook service');
});

app.post('/test/token', ({ body }, res) => {
    console.log(body.token);
    axios.post('https://api.trello.com/1/webhooks/', {
        key: process.env.TRELLO_API_KEY,
        token: body.token,
        description: 'test webhook 1',
        callbackURL: `${process.env.TEST_URL}/webhook`,
        idModel: '5d597ff5bdea837eb5b639a5',
    })
    .then(({ data }) => {
        console.log(data);
        res.send('Success');
    })
    .catch((err) => console.log(err));
});
