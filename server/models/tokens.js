const { Pool } = require('pg');

 // if app is in production, connect to Heroku DB, otherwise use local DB
const pool = (process.env.NODE_ENV === 'production')
    ? new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } })
    : new Pool({ host: 'localhost',user: 'postgres', database: 'roadrunner', password: process.env.LOCAL_PG_PW, port: 5432 });

// Adds a refresh token to the token table
const addRefreshToken = async (userid, refreshToken) => {
    await pool.query('INSERT INTO tokens VALUES ($1, $2)', [userid, refreshToken]);
    return true;
}

// Checks if refresh token exists in the token table
const checkRefreshTokenExists = async (userid, refreshToken) => {
    const { rows } = await pool.query('SELECT userid, refreshtoken FROM tokens WHERE userid=$1 AND refreshtoken=$2', [userid, refreshToken]);
    return rows.length > 0;
}

const deleteRefreshToken = async (refreshToken) => {
    await pool.query('DELETE FROM tokens WHERE refreshtoken=$1', [refreshToken]);
    return true;
}

module.exports = {
    addRefreshToken,
    checkRefreshTokenExists,
    deleteRefreshToken
};