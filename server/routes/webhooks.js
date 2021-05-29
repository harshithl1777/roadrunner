const express = require('express');
const router = express.Router();
const { createWebhookTrello, deleteWebhooksTrello } = require('../services/apis/trello');
const { prepareSpreadsheet } = require('../services/apis/googleSheets');
const { retrieveAllWebhooks, createWebhook, deleteWebhooks } = require('../models/webhooks');
const { retrieveTokens } = require('../models/users');

// POST request to create new webhook
router.post('/', (req, res) => {
    retrieveTokens(req.body.email)
    .then(async (tokens) => {
        try {
            const id = await createWebhookTrello(tokens.trellotoken, req.body.modelID);
            await prepareSpreadsheet(req.body.webhookData.sheetid, req.body.webhookData.tabname, 'bluestacks-master')
            .then
            createWebhook(req.body.webhookData, id)
                .then((dbRes) => {
                    if (dbRes) res.status(201).send({ req: 'success' });
                })
                .catch(dbErr => {
                    console.log(dbErr);
                    res.status(500).send({ req: 'fail', msg: dbErr })
                });
        } catch(err) {
            console.log(err);
            res.status(500).send({ req: 'fail', msg: err });
        }
    })
});

// GET request to retrieve all existing webhooks
router.get('/', (req, res) => {
    retrieveAllWebhooks()
        .then(data => res.status(200).send({ req: 'success', data }))
        .catch(err => res.status(500).send({ req: 'fail', msg: err, url: process.env.DATABASE_URL }));
});


// POST request to delete array of webhooks with ids
router.delete('/', async (req, res) => {
    const tokens = await retrieveTokens(req.body.email);
    console.log(req.body.email, req.body.ids);
    console.log(tokens);
    deleteWebhooksTrello(req.body.ids, tokens.trellotoken)
        .then(trelloResult => {
            console.log(trelloResult);
            deleteWebhooks(trelloResult[0])
                .then(dbResult => {
                    console.log(dbResult);
                    if (dbResult && trelloResult[0].length === req.body.ids.length) res.status(200).send({ req: 'success' });
                    else if (dbResult && trelloResult[0].length !== req.body.ids.length) res.status(500).send({ req: 'fail', msg: 'No webhooks were deleted. Deletion fully failed.' });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send({ req: 'fail', msg: err })
                });
        })
        .catch(err => { 
            console.log(err);
            res.status(500).send({ req: 'fail', msg: err });
        });
});

module.exports = router;