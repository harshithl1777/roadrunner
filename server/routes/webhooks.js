const express = require('express');
const axios = require('axios');
const app = module.exports = express();
const { triggerController } = require('../services/receivers');
const webhooksController = require('../controllers/webhooks');
const { authorizeExternalAPI, authorizeClient } = require('./middleware');

// POST request to create new webhook
app.post('/api/webhooks', (req, res) => {
    console.log('Received webhook creation request');
});

app.get('/api/webhooks', (req, res) => {
    res.status(200).send('Webhook data');
});