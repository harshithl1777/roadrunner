const express = require('express');
const app = module.exports = express();
const { gatherList } = require('../services/apis/trello');
const formatData = require('../helpers/formatData');

// HEAD Request for Trello to verify creation of new webhook
app.head('/api/receiver', (req, res) => res.sendStatus(200));

// POST Request that will receive Trello webhook triggers
app.post('/api/receiver', ({ body }, res) =>  {
    switch(body.data.list) {
        case undefined:
            const list = gatherList(body.data.list.id);
            const resource = formatData(list); // TODO: Figure out whether or not parsing is required
            break
        default:
            const listFormer = gatherList(body.data.listBefore.id);
            const listCurrent = gatherList(body.data.listAfter.id);
            const formerResource = formatData(listFormer);
            const currentResource = formatData(listCurrent);
            break
    }
});