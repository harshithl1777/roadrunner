const express = require('express');
const router = express.Router();
const { gatherCards } = require('../services/apis/trello');
const { updateSpreadsheet } = require('../services/apis/googleSheets');
const formatData = require('../services/utils/dataFormatter');
const { retrieveTokens } = require('../models/users');
const { checkWebhookExists, retrieveSingleWebhook } = require('../models/webhooks');
const { errorDetected } = require('../services/apis/mailer');


const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}

// HEAD Request for Trello to verify creation of new webhook
router.head('/', (req, res) => {
    res.status(200).send('Gateway open')
});

// POST Request that will receive Trello webhook triggers
router.post('/', async ({ body }, res) =>  {
    const { trellotoken } = await retrieveTokens('bluestacks-master');
    try {
        switch(body.action.data.listBefore) {
            case undefined:
                const list = await gatherCards(body.action.data.list.id, trellotoken);
                const resource = formatData(list);
                const { sheetid, tabname } = await retrieveSingleWebhook(body.action.data.list.id);
                await updateSpreadsheet(sheetid, tabname, 'bluestacks-master', resource);
                res.status(200).send('Received');
                break
            default:
                await asyncForEach([body.action.data.listBefore.id, body.action.data.listAfter.id], async (id) => {
                    if (await checkWebhookExists(id)) {
                        const list = await gatherCards(id, trellotoken);
                        const resource = formatData(list);
                        const { sheetid, tabname } = await retrieveSingleWebhook(id);
                        await updateSpreadsheet(sheetid, tabname, 'bluestacks-master', resource);
                    }
                });
                res.status(200).send('Received');
                break
        }
    } catch(err) {
        console.log(err);
        await errorDetected(err);
    }
});

module.exports = router;