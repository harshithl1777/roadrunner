const { Pool, Client } = require('pg');
const client = new Client({
    user: 'cturzhmqifofjq',
    password: '0d473fdfc696236048b9f42dc86430cb65da58e865966b54adeb324e67308f4a',
    host: 'ec2-35-174-35-242.compute-1.amazonaws.com',
    port: '5432',
    database: 'd5rv9od01n0gup',
    ssl: 'require'
});

client.connect()
    .then(() => console.log('Connected successfully'))
    .catch((e) => console.log(e))
    .finally(() => client.end());