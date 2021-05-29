const express = require('express');

const app = express();

app.get('/test', (req, res) => {
    res.sendStatus(200);
});

app.listen(5000);