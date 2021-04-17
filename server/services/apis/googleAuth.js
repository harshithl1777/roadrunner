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

// Exchange code for access token
const exchangeToken = async (code) => {
    const { tokens } = await oAuthClient.getToken(code);
    return tokens;
}
 
module.exports = {
    acquireAuthURL,
    exchangeToken
};