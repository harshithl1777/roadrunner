const { Client } = require('pg');

const pgclient = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres'
});

pgclient.connect();

test('Query Postgres DB', async () => {
    await pgclient.query('CREATE TABLE students (name VARCHAR)');
    await pgclient.query('INSERT INTO students (name) VALUES ($1)', ['Harshith']);
    const { rows } = await pgclient.query('SELECT name FROM students');
    expect(rows.length).not.toBeNull();
});