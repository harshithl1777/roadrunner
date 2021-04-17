const jwt = require('jsonwebtoken');

const authorizeClient = (req, res, next) => {
    const token = req.header('accessToken').split(' ')[1];
    if (!token) res.status(401).send('Access Token is undefined');
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send('Invalid access token');
        req.user = user;
        next();
    });
}

module.exports = authorizeClient;