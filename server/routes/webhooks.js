const express = require('express');
const axios = require('axios');
const app = module.exports = express();
const { webhookReceiver } = require('../controllers/webhookController');

// POST request to create new webhook
app.post('/webhook/new', ({ body }, res) => {
    console.log('Received webhook creation request');
    axios.post('https://api.trello.com/1/webhooks', {
        key: process.env.TRELLO_API_KEY,
        token: body.token,
        description: 'test webhook 1',
        callbackURL: `${process.env.API_URL}/webhook`,
        idModel: '5d597ff5bdea837eb5b639a5',
    })
    .then(() => {
        res.status(201).send('Success');
    })
    .catch((err) => console.log(err));
});


// HEAD Request for Trello to verify creation of new webhook
app.head('/webhook', (req, res) => {
    res.status(200).send('Ready for webhook service');
});

// POST Request that will receive Trello webhook triggers
app.post('/webhook', ({ body }, res) =>  webhookReceiver(body));