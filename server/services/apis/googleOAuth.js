const { google } = require('googleapis');

// OAuth client initialization
const oAuthClient = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'https://roadrunner.herokuapp.com/api/oauth/google/code',
);

// returns auth URL to client side for user verify prompt by Google
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