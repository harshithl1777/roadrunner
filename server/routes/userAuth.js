const express = require('express');
const jwt = require('jsonwebtoken');
const app = module.exports = express();

app.post('/api/auth', (req, res) => {
    // First authenticate user


    // Then send over access token that can be used to perform requests while the user is authorized
    const user = { name: req.body.username, password: req.body.pw };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.send({ accessToken });
});