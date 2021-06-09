const express = require('express');
const jwt = require('jsonwebtoken');
const { getUser } = require('../models/users');
const { addRefreshToken, checkRefreshTokenExists, deleteRefreshToken } = require('../models/tokens');
const router = express.Router();

/**
 * Logs the user in with email / password and return access, refresh tokens
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
        const accessToken = jwt.sign({ userid: userRows[0].userid }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
        const refreshToken = jwt.sign({ userid: userRows[0].userid }, process.env.REFRESH_TOKEN_SECRET);
        await addRefreshToken(userRows[0].userid, refreshToken);
        
        const cookieConfig = { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        };
        return res.cookie('refreshToken', refreshToken, cookieConfig).send({ accessToken });

    } catch(err) {
        return res.status(500).send({ code: 500, message: 'Internal server error' });
    }
});



router.post('/signup', async (req, res) => {
    
});

/**
 * 
 */

router.post('/refresh', async (req, res) => {
    try {
        if (!req.cookies.refreshToken) return res.status(401).send({ code: 401, message: 'Bad Request' });
        jwt.verify(req.cookies.refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
            if (err) return res.status(403).send({ code: 403, message: 'Invalid credentials' });
            switch (await checkRefreshTokenExists(user.userid, req.cookies.refreshToken)) {
                case true:
                    const accessToken = jwt.sign({ id: user.userid }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' });
                    return res.send({ accessToken });
                default:
                    return res.status(403).send({ code: 403, message: 'No such token exists' });
            }
        });
    } catch(err) {
        return res.status(500).send({ code: 500, message: 'Internal server error' });
    }
});

router.delete('/logout', async (req, res) => {
    try {
        if (!req.cookies.refreshToken) return res.status(401).send({ code: 401, message: 'Bad Request' });
        await deleteRefreshToken(req.cookies.refreshToken);
        const cookieConfig = { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(0)
        };
        res.cookie('refreshToken', null, cookieConfig);
        res.sendStatus(204);
    } catch(err) {
        return res.status(500).send({ code: 500, message: 'Internal server error' });
    }
});

module.exports = router;