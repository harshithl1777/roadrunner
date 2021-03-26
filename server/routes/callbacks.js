const express = require('express');
const axios = require('axios');
const app = module.exports = express();

app.post('/webhook', ({ body }, res) => {
    console.log(body);
});

app.head('/webhook', ({ query }, res) => {
    if (query.token === process.env.WEBHOOK_ROUTE_KEY) {
        res.status(200).send('Ready for webhook service');
    } else {
        res.status(500).send('Invalid route key');
    }
});

app.post('/test/token', ({ body }, res) => {
    console.log(body.token);
    axios.post('https://api.trello.com/1/webhooks/', {
        key: process.env.TRELLO_API_KEY,
        token: body.token,
        description: 'test webhook 1',
        callbackURL: `http://localhost:5000/webhook?token=${process.env.WEBHOOK_ROUTE_KEY}`,
        idModel: 'RwrH3XiI',
    })
    .then(({ data }) => {
        console.log(data);
        res.send('Success');
    })
    .catch((err) => console.log(err));
});
