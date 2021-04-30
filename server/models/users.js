const { Pool } = require('pg');

const pool = (process.env.NODE_ENV === 'production') 
    ? new Pool({ connectionString: process.env.DATABASE_URL })
    : new Pool({ host: 'localhost',user: 'postgres', database: 'roadrunner', password: process.env.LOCAL_PG_PW, port: 5432 });

const authenticateUser = async (email) => {
    const { rows, err } = await pool.query(`SELECT email, pw FROM users WHERE email=$1`, [email]);
    if (err) throw err;
    return rows;
}

const retrieveTokens = async (email) => {
    const { rows, err } = await pool.query('SELECT gapiaccess, gapirefresh, trellotoken FROM users WHERE email=$1', [email]);
    if (err) throw err;
    return rows[0];
}

const addTrelloToken = async (email, token) => {
    const { rows, err } = await pool.query('UPDATE users SET trellotoken=$1 WHERE email=$2', [token, email]);
    if (err) throw err;
    return true;
}

const addGoogleTokens = async (email, tokens) => {
    const { rows, err } = await pool.query('UPDATE users SET gapiaccess=$1, gapirefresh=$2 WHERE email=$3', [tokens.access_token, tokens.refresh_token, email]);
    if (err) throw err;
    return true;
}

module.exports = {
    authenticateUser,
    retrieveTokens,
    addTrelloToken,
    addGoogleTokens
};

