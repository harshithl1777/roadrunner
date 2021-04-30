const { Pool } = require('pg');

const pool = (process.env.NODE_ENV === 'production') 
    ? new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } })
    : new Pool({ host: 'localhost',user: 'postgres', database: 'roadrunner', password: process.env.LOCAL_PG_PW, port: 5432 });

const authenticateUser = async (username) => {
    const { rows, err } = await pool.query(`SELECT username, pw FROM users WHERE username=$1`, [username]);
    if (err) throw err;
    return rows;
}

const retrieveTokens = async (username) => {
    const { rows, err } = await pool.query('SELECT gapiaccess, gapirefresh, trellotoken FROM users WHERE username=$1', [username]);
    if (err) throw err;
    return rows[0];
}

const addTrelloToken = async (username, token) => {
    const { rows, err } = await pool.query('UPDATE users SET trellotoken=$1 WHERE username=$2', [token, username]);
    if (err) throw err;
    return true;
}

const addGoogleTokens = async (username, tokens) => {
    const { rows, err } = await pool.query('UPDATE users SET gapiaccess=$1, gapirefresh=$2 WHERE username=$3', [tokens.access_token, tokens.refresh_token, username]);
    if (err) throw err;
    return true;
}

module.exports = {
    authenticateUser,
    retrieveTokens,
    addTrelloToken,
    addGoogleTokens
};

