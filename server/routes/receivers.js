const express = require('express');
const app = module.exports = express();
const { webhookReceiver } = require('../controllers/trello');

// HEAD Request for Trello to verify creation of new webhook
app.head('/webhook', (req, res) => {
    res.status(200).send('Ready for webhook service');
});

// POST Request that will receive Trello webhook triggers
app.post('/webhook', ({ body }, res) =>  webhookReceiver(body));

