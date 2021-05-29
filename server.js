const express = require('express');

const app = express();

app.get('/tests', (req, res) => {
    res.sendStatus(200);
});

app.listen(5000);

module.exports = app;