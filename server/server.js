const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config({ path: './config/.env' });
const bodyParser = require('body-parser');
const webhooks = require('./routes/webhooks');
const googleAuth = require('./routes/googleAuth');
const userAuth = require('./routes/userAuth');
const clientMiddleware = require('./routes/middleware/client');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(googleAuth);
app.use(webhooks);
app.use(clientMiddleware);
app.use(userAuth);



app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static(path.join(__dirname, '..', 'public')));

// app.use((req, res, next) => {
//     res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
// });

const port = 5000 || process.env.PORT;

app.listen(port, () => {
    console.log(`Express listening on port ${port}`);
});