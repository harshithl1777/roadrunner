const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const printUsers = async () => {
    const { rows, err } = await pool.query('SELECT * FROM users');
    if (err) throw err;
    console.log(rows);
}

printUsers()
.then(res => console.log(res))
.catch(err => console.log(err));