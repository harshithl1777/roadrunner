const express = require('express');
const app = module.exports = express();
const { acquireAuthURL, exchangeToken } = require('../helpers/googleAPIs');

 
app.get('/auth/google', (req, res) => {
    const authURL = acquireAuthURL();
    res.status(200).send({ authURL });
});

app.post('/auth/google', async (req, res) => {
    exchangeToken(req.body.code);
});