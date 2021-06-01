const { google } = require('googleapis');
const { retrieveTokens, removeGoogleTokens } = require('../../models/users');

const oAuthClient = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'https://roadrunner.herokuapp.com',
);

const prepareSpreadsheet = async (id, tab, email) => {
    let error = false;
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
        }, async (err, res) => {
            if (err) {
              await removeGoogleTokens('bluestacks-master');
              error = false;
            } else {
              error = true;
            }
      });
    return error;
}

const updateSpreadsheet = async (id, tab, email, resource) => {
    const { gapirefresh } = await retrieveTokens(email);
    let error = false;
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
        }, async (err, res) => {
          console.log(err);
          if (err) {
            await removeGoogleTokens('bluestacks-master');
            error = false;
          } else {
            error = true;
          }
      });
    return error;
}

module.exports = {
  prepareSpreadsheet,
  updateSpreadsheet
}


