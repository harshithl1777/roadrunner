const express = require('express');
const jwt = require('jsonwebtoken');
const { getUser } = require('../models/users');

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const user = await getUser(req.body.email);
        if (user.length === 0 || user.password !== req.body.password) {
            res.status(404).send({ code: 404, message: 'User not found or invalid credentials' });
        } 
        const accessToken = jwt.sign({ id: user.id, password: user.password }, process.env.ACCESS_TOKEN_SECRET);
        res.send({ accessToken });
    } catch(err) {
        res.status(500).send({ code: 500, message: err });
    }
});

router.post('/signup', async (req, res) => {
    
});

router.get('/tokens/access', (req, res) => {
    // First Authenticate user
    
});

module.exports = router;