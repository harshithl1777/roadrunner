const { google } = require('googleapis');

const oAuthClient = new google.auth.OAuth2(
    '551216557727-n4bq3gejg73h559gng0o8m8g6skjhq6m.apps.googleusercontent.com',
    'AZuQ2aWqw9iS88sgFp47MRXV',
    'http://localhost:3000',
);

oAuthClient.setCredentials({ access_token: 'ya29.a0AfH6SMCl_D9TLVxxvuS6ufLM073cFQBYJ65zK16Pg_fszJkM_Y4JGXYbDelJ_4WDF5XlWQ6gi2ElvlNh245NsQAtqyK40hxDi5ah6BYvd_UC3qIPsI1EodboLr8vPmOruCnRYtbrdZNLDcVcT_OOvZPFmT6m' });
const sheets = google.sheets({ version: 'v4', oAuthClient });
  sheets.spreadsheets.values.update({
    spreadsheetId: '1opvJZ2yqfWgVr5ol1NXkvhn7Y4RKon2xPhemMbQprwA',
    range: 'Sheet1!A1:B2',
    resource: [['Testing', 'Another test'], ['Row 2', 'Row 2 2!']],
    key: '1B44HkvVZ0_0fn0-VRritSgQR6jfY6sJXTDLjmVjEX9o'
  }, (err, res) => {
    if (err) {
      return console.log('The API returned an error: ' + err);
    } else {
      console.log('Data written to Spreadsheet');
    }
});

