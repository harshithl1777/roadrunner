const express = require('express');
const app = module.exports = express();
const { acquireAuthURL, exchangeToken } = require('../services/apis/googleAuth');
const { addGoogleTokens } = require('../models/users');

 
app.get('/api/oauth/google', (req, res) => {
    const authURL = acquireAuthURL();
    res.status(200).send({ authURL });
});

app.post('/api/oauth/google', async (req, res) => {
    const code = req.body.code.replace('%2F', '/');
    console.log(code);
    exchangeToken(code)
    .then(tokens => {
        addGoogleTokens(tokens, req.body.email)
        .then(dbRes => {
            if (dbRes) res.sendStatus(201);
        })
        .catch(() => res.status(501).send({ req: 'fail', msg: 'Could not add tokens to database' }));
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send({ req: 'fail', msg: 'Could not create tokens' }) 
    })
});

app.get('/api/oauth/google/code', async (req, res) => {
    const code = req.query.code;
    exchangeToken(code)
    .then(tokens => {
        addGoogleTokens('bluestacks-master', tokens)
        .then((dbRes) => {
            if (dbRes) res.redirect(`${process.env.CLIENT_URL}/app/webhooks`);
        })
        .catch((dbErr) => console.log(dbErr));
    })
    .catch(err => console.log(err));
});