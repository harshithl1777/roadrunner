const express = require('express');
const router = express.Router();
const { authenticateUser, retrieveTokens, addTrelloToken } = require('../models/users');

router.post('/', (req, res) => {
    authenticateUser(req.body.username)
    .then(data => {
        if (data.length === 0) res.status(401).send({ req: 'fail', msg: 'No such account' });
        else if (data[0].pw === req.body.password) res.sendStatus(200);
        else if (data[0].pw !== req.body.password) res.status(401).send({ req: 'fail', msg: 'Invalid password or email' });
    })
    .catch(err => {
        console.log(err);
        res.status(500).send({ req: 'fail', msg: err })
    });
});

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