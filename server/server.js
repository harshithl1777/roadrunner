const express = require('express');
const path = require('path');
require('dotenv').config({ path: './config/.env' });
const bodyParser = require('body-parser');
const callbacks = require('./routes/callbacks.js');

const app = express();
app.use(bodyParser.json());

app.use(callbacks);

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

const port = 5000 || process.env.PORT;

app.listen(port, () => {
    console.log(`Express listening on port ${port}`);
});