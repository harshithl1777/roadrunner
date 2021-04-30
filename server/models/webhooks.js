const { Pool } = require('pg');

const pool = (process.env.NODE_ENV === 'production') 
    ? new Pool({ connectionString: process.env.DATABASE_URL })
    : new Pool({ host: 'localhost', user: 'postgres', database: 'roadrunner', password: process.env.LOCAL_PG_PW, port: 5432 });

const createWebhook = async (data, id) => {
    const { rows, err } = await pool.query(`INSERT INTO webhooks (id, name, description, listID, sheetID, tabName, dateCreated, timeCreated, listname) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
    [id, data.name, data.description, data.listid, data.sheetid, data.tabname, data.datecreated, data.timecreated, data.listname]);
    if (err) throw err;
    if (rows) return true;
}

const retrieveAllWebhooks = async () => {
   const { rows, err } = await pool.query('SELECT * FROM webhooks');
   if (err) throw err;
   const data = [];
   rows.forEach((row) => {
       const dataElement = {
           id: row.id,
           name: { title: row.name, desc: row.description },
           sheet: { id: row.sheetid, tab: row.tabname },
           list: { name: row.listname, id: row.listid },
           date: { day: row.datecreated, time: row.timecreated }
       }
       data.push(dataElement);
   });
   return data;
}

const deleteWebhooks = async (ids) => {
    const issues = [];
    ids.forEach(async (id) => {
        const res = await pool.query('SELECT * FROM webhooks');
        if (res.err) throw res.err;
        const { rows, err } = await pool.query('DELETE FROM webhooks WHERE id=$1', [id]);
        if (err) throw err;
        else if (rows.length - res.rows.length !== 1) issues.push(1);
    });
    return (issues.length === 0) ? true : false;
}

const checkWebhookExists = async (listID) => {
    const { rows, err } = await pool.query('SELECT * FROM webhooks WHERE listid=$1', [listID]);
    if (err) throw err;
    else if (rows.length === 1) return true;
}

const retrieveSingleWebhook = async (listID) => {
    const { rows, err } = await pool.query('SELECT sheetid, tabname FROM webhooks WHERE listid=$1', [listID]);
    if (err) throw err;
    return rows[0];
}

module.exports = {
    createWebhook,
    retrieveAllWebhooks,
    deleteWebhooks,
    checkWebhookExists,
    retrieveSingleWebhook
};