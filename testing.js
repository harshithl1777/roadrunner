const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const printUsers = async () => {
    const { rows, err } = await pool.query('SELECT * FROM users');
    console.log(rows);
    if (err) console.log(err);
    if (err) throw err;
    console.log(rows);
}