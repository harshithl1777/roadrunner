const express = require('express');
const jwt = require('jsonwebtoken');
const { getUser } = require('../models/users');
const { addRefreshToken, checkRefreshToken } = require('../models/tokens');

const router = express.Router();

/**
 * Logs in the user with email / password and return access, refresh token
 * @name POST /api/auth/login
 * @param {Object} req.user The user's email and password
 * @returns {Object} Access, refresh tokens and user object from DB 
 */
router.post('/login', async (req, res) => {
    try {
        const userRows = await getUser(req.body.email);
        if (userRows.length === 0 || userRows[0].password !== req.body.password) {
            return res.status(404).send({ code: 404, message: 'User not found or invalid credentials' });
        }
        const accessToken = jwt.sign({ id: userRows[0].id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
        const refreshToken = jwt.sign({ id: userRows[0].id }, process.env.REFRESH_TOKEN_SECRET);
        await addRefreshToken(userRows[0].id, refreshToken);
        return res.send({ accessToken, refreshToken, user: userRows[0] });
    } catch(err) {
        return res.status(500).send({ code: 500, message: 'Internal server error' });
    }
});


router.post('/signup', async (req, res) => {
    
});

router.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken;

});

module.exports = router;