const express = require('express');
const path = require('path');

const app = express();
const port = 3000 || process.env.PORT.
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static('public'));

app.get('/api', ({ query }, res) => {
    if (query.token === '345345') {
        res.send('Welcome');
    } else {
        res.send('Invalid or missing token');
    }
});

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Express listening on port ${port}`);
});