const express = require('express');
const { gatherList } = require('../models/trello_data');
const app = module.exports = express();

// HEAD Request for Trello to verify creation of new webhook
app.head('/webhook', ({ query }, res) => {
    res.status(200).send('Ready for webhook service');
});

// POST Request that will receive Trello webhook triggers
app.post('/webhook', ({ body }, res) => {
    switch (body.action.data.list) {
        case undefined:
            console.log(gatherList(body.action.data.listBefore.id));
            console.log(gatherList(body.action.data.listAfter.id));
            break
        default:
            console.log(gatherList(body.action.data.list.id));
            break
    }
});

