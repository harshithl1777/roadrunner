const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config({ path: './config/.env' });
const bodyParser = require('body-parser');
const receivers = require('./routes/receivers');
const { basicRouteAuth } = require('./routes/middleware');
const webhooks = require('./routes/webhooks');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(receivers);
app.use(basicRouteAuth);
app.use(webhooks);

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

const port = 5000 || process.env.PORT;

app.listen(port, () => {
    console.log(`Express listening on port ${port}`);
});