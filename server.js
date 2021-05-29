const express = require('express');

const app = express();

app.get('/test', (req, res) => {
    res.sendStatus(200);
});

const server = app.listen(5000);

module.exports = {
    server,
    app
};