const { google } = require('googleapis');
const { retrieveTokens, removeGoogleTokens } = require('../../models/users');

const oAuthClient = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'https://roadrunner.herokuapp.com',
);

const prepareSpreadsheet = async (id, tab, email) => {
  try {
    const { gapirefresh } = await retrieveTokens(email);
    oAuthClient.setCredentials({ refresh_token: gapirefresh });
    const sheets = google.sheets({ version: 'v4', auth: oAuthClient });
      sheets.spreadsheets.values.update({
          spreadsheetId: id,
          range: `${tab}!A1:L1`,
          valueInputOption: 'RAW',
          resource: {
            "range": `${tab}!A1:L1`,
            "majorDimension": "ROWS",
            "values": [
              ['Card Name', 'Package name', 'Developer', 'Category', 'Tier', 'Geo', 'Submitted by', 'Game.tv', 'CPI', 'Branding', 'CPC', 'Live']
            ]
          },
          key: process.env.GOOGLE_API_KEY
        }, (err, res) => {
          if (err) throw err;
          return true;
      });
  } catch(err) {
    await removeGoogleTokens('bluestacks-master');
  }
}

const updateSpreadsheet = async (id, tab, email, resource) => {
  try {
    const { gapirefresh } = await retrieveTokens(email);
    oAuthClient.setCredentials({ refresh_token: gapirefresh });
    const sheets = google.sheets({ version: 'v4', auth: oAuthClient });
      sheets.spreadsheets.values.update({
          spreadsheetId: id,
          range: `${tab}!A2:L${resource.length+1}`,
          valueInputOption: 'RAW',
          resource: {
            "range": `${tab}!A2:L${resource.length+1}`,
            "majorDimension": "ROWS",
            "values": resource
          },
          key: process.env.GOOGLE_API_KEY
        }, (err, res) => {
          if (err) throw err;
          return true;
      });
  } catch(err) {
    await removeGoogleTokens('bluestacks-master');
  }
}

module.exports = {
  prepareSpreadsheet,
  updateSpreadsheet
}


