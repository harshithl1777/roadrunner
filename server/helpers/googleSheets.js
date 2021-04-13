const { google } = require('googleapis');

const oAuthClient = new google.auth.OAuth2(
    '551216557727-n4bq3gejg73h559gng0o8m8g6skjhq6m.apps.googleusercontent.com',
    'AZuQ2aWqw9iS88sgFp47MRXV',
    'http://localhost:3000',
);

oAuthClient.setCredentials({ access_token: 'ya29.a0AfH6SMCl_D9TLVxxvuS6ufLM073cFQBYJ65zK16Pg_fszJkM_Y4JGXYbDelJ_4WDF5XlWQ6gi2ElvlNh245NsQAtqyK40hxDi5ah6BYvd_UC3qIPsI1EodboLr8vPmOruCnRYtbrdZNLDcVcT_OOvZPFmT6m' });
const sheets = google.sheets({version: 'v4', oAuthClient});
  sheets.spreadsheets.values.get({
    spreadsheetId: '14m_QIbJSgh92hWyLG1xEzP7logQwFZp8CmGXlqvsjx0',
    range: 'Digital Event Budget!A1:B2',
    key: 'AIzaSyAw23zRo_wvHfGQ0SR63nUQOwvr3AZQD9E'
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      console.log('Name, Major:');
      // Print columns A and E, which correspond to indices 0 and 4.
      rows.map((row) => {
        console.log(`${row[0]}, ${row[4]}`);
      });
    } else {
      console.log('No data found.');
    }
  });
