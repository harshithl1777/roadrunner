const jwt = require('jsonwebtoken');

/**
 * Authenticates requests to any endpoint based on access token in auth header
 * @param {String} req.headers.authorization Auth header in Bearer {{access_token}} format
 * @returns {Object} User object in next() function
 */

const authenticateToken = (req, res, next) => {
    // If request is to auth endpoint, bypass access token verification
    if (req.path.includes('/api/auth')) return next();

    const authHeader = req.headers['authorization'];
    if (!authHeader)
        return res.status(401).send({ code: 401, message: 'Bad request' });
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err)
            return res
                .status(403)
                .send({ code: 403, message: 'Invalid credentials' });
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
