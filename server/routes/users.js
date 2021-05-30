const express = require('express');
const router = express.Router();
const { retrieveTokens, addTrelloToken } = require('../models/users');

router.post('/tokens', (req, res) => {
    retrieveTokens(req.body.email)
    .then(data => res.status(200).send({ req: 'success', data }))
    .catch(err => res.status(500).send({ req: 'fail', msg: err }));
});

router.post('/tokens/trello', (req, res) => {
    addTrelloToken(req.body.email, req.body.token)
    .then(dbRes => { if (dbRes) res.sendStatus(201) })
    .catch(err => res.status(500).send({ req: 'fail', msg: err }));
});

module.exports = router;