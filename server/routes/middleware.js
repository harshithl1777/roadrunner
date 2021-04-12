// Middleware for all CRUD routes from client side to ensure primary auth
const basicRouteAuth = (req, res, next) => {
    try {
        if (req.header('token') !== process.env.PRIMARY_ROUTE_KEY) {
            throw new Error('Invalid key');
        } else {
            next();
        }
    } catch({ message }) {
        res.status(401).send(message);
    }
}

module.exports = { 
    basicRouteAuth,
};
