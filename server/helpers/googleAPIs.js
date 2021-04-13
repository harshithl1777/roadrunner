const { google } = require('googleapis');

// OAuth client initialization
const oAuthClient = new google.auth.OAuth2(
    '551216557727-n4bq3gejg73h559gng0o8m8g6skjhq6m.apps.googleusercontent.com',
    'AZuQ2aWqw9iS88sgFp47MRXV',
    'http://localhost:3000',
);

// returns auth URL to client sidefor user verify prompt by Google
const acquireAuthURL = () => {
    return oAuthClient.generateAuthUrl({ 
        access_type: 'offline', 
        scope: 'https://www.googleapis.com/auth/spreadsheets' 
    });
}

const exchangeToken = async (code) => {
    const { tokens }= await oAuthClient.getToken(code);
    oAuthClient.setCredentials(tokens);
    const sheets = google.sheets({version: 'v4', oAuthClient});
  sheets.spreadsheets.values.get({
    spreadsheetId: '14m_QIbJSgh92hWyLG1xEzP7logQwFZp8CmGXlqvsjx0',
    range: 'Digital Event Budget!A1:B2',
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
}
 
module.exports = {
    acquireAuthURL,
    exchangeToken
};