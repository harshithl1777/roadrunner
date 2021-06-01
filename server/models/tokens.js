const { Pool } = require('pg');

const pool = (process.env.NODE_ENV === 'production') 
    ? new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } })
    : new Pool({ host: 'localhost',user: 'postgres', database: 'roadrunner', password: process.env.LOCAL_PG_PW, port: 5432 });

const addRefreshToken = async (userid, token) => {
    await pool.query('INSERT INTO tokens VALUES ($1, $2)', [userid, token]);
    return true;
}

const checkRefreshToken = async (userid, token) => {
    const
}

module.exports = {
    addRefreshToken
};