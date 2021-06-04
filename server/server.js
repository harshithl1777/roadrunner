const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('./config/sentry');
require('dotenv').config({ path: '../.env' });
const webhookRouter = require('./routes/webhooks');
const oauthRouter = require('./routes/oauth');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const serviceRouter = require('./routes/receivers');
const middleware = require('./routes/middleware');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/oauth', oauthRouter);
app.use('/api/webhooks', webhookRouter);
app.use('/api/services', serviceRouter);
app.use('/api/users', userRouter);
app.use(middleware);
app.use('/api/auth', authRouter);

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static(path.join(__dirname, '..', 'public')));

// app.use((req, res, next) => {
//     res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
// });

app.get('/test', (req, res) => {
    res.send({ success: true });
});

const port = process.env.PORT || 5000;

const httpServer = app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = {
    app,
    httpServer
}