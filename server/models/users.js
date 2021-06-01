const { Pool } = require('pg');

const pool = (process.env.NODE_ENV === 'production') 
    ? new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } })
    : new Pool({ host: 'localhost',user: 'postgres', database: 'roadrunner', password: process.env.LOCAL_PG_PW, port: 5432 });

/**
 * Retrieves user details from database
 * @param {string} email The user's email
 * @returns {Array} Rows containing user data
 */
const getUser = async (email) => {
    const { rows } = await pool.query('SELECT userid, email, name, password FROM users WHERE email=$1', [email]);
    return rows;
}

const retrieveTokens = async (username) => {
    const { rows } = await pool.query('SELECT gapiaccess, gapirefresh, trellotoken FROM users WHERE username=$1', [username]);
    return rows[0];
}

const addTrelloToken = async (username, token) => {
    await pool.query('UPDATE users SET trellotoken=$1 WHERE username=$2', [token, username]);
    return true;
}

const addGoogleTokens = async (username, tokens) => {
    await pool.query('UPDATE users SET gapiaccess=$1, gapirefresh=$2 WHERE username=$3', [tokens.access_token, tokens.refresh_token, username]);
    return true;
}

module.exports = {
    getUser,
    retrieveTokens,
    addTrelloToken,
    addGoogleTokens
};

