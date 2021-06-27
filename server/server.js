const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });
const bodyParser = require('body-parser');
const webhooks = require('./routes/webhooks');
const googleAuth = require('./routes/googleAuth');
const userAuth = require('./routes/userAuth');
const receivers = require('./routes/receivers');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(googleAuth);
app.use(webhooks);
app.use(receivers);
app.use(userAuth);

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Express listening on port ${port}`);
});

console.log(process.env);