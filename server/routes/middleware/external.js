const authorizeExternalAPI = (req, res, next) => {
    try {
        if (req.header('token') !== process.env.PRIMARY_ROUTE_TOKEN) {
            throw new Error('Invalid Key');
        } else {
            next();
        }
    } catch({ message }) {
        res.status(401).send(message);
    }
}

module.exports = authorizeExternalAPI;