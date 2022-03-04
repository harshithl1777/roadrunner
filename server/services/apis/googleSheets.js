const { google } = require('googleapis');
const { retrieveTokens, removeGoogleTokens } = require('../../models/users');

const oAuthClient = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'https://roadrunner.herokuapp.com',
);

const prepareSpreadsheet = async (id, tab, email) => {
    try {
      const { gapirefresh, gapiaccess } = await retrieveTokens(email);
      oAuthClient.setCredentials({ refresh_token: gapirefresh, access_token: gapiaccess });
      const sheets = google.sheets({ version: 'v4', auth: oAuthClient });
        await sheets.spreadsheets.values.update({
            spreadsheetId: id,
            range: `${tab}!A1:K1`,
            valueInputOption: 'RAW',
            resource: {
              "range": `${tab}!A1:K1`,
              "majorDimension": "ROWS",
              "values": [
                ['Card Name', 'Package name', 'Developer', 'Category', 'Tier', 'Geo', 'Game.tv', 'CPI', 'Branding', 'CPC', 'Live']
              ]
            },
            key: process.env.GOOGLE_API_KEY
          });
      return true;
    } catch(err) {
      await removeGoogleTokens('bluestacks-master');
      console.log(err);
      return false;
    }
}

const updateSpreadsheet = async (id, tab, email, resource) => {
  try {
    const { gapirefresh, gapiaccess } = await retrieveTokens(email);
    oAuthClient.setCredentials({ refresh_token: gapirefresh, access_token: gapiaccess });
    const sheets = google.sheets({ version: 'v4', auth: oAuthClient });
      await sheets.spreadsheets.values.update({
          spreadsheetId: id,
          range: `${tab}!A2:L${resource.length+1}`,
          valueInputOption: 'RAW',
          resource: {
            "range": `${tab}!A2:L${resource.length+1}`,
            "majorDimension": "ROWS",
            "values": resource
          },
          key: process.env.GOOGLE_API_KEY
        });
    return true;
  } catch(err) {
    await removeGoogleTokens('bluestacks-master');
    console.log(err);
    return false;
  }
}

module.exports = {
  prepareSpreadsheet,
  updateSpreadsheet
}


