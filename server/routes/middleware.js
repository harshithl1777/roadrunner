const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    if (req.path.includes('/api/auth/tokens/access')) return next();
        const authHeader = req.headers['authorization'];
        if (!authHeader) return res.status(401).send({ code: 401, message: 'Bad request' });
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (user, err) => {
            if (err) res.status(403).send({ code: 403, message: 'Invalid credentials' });
            req.user = user;
            next();
        });
}

module.exports = authenticateToken;