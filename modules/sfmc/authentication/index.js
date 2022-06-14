const axios = require('axios');
const sfmcDomain = process.env.SFMC_DOMAIN;

const authenticate = async () => {
    // defining required fields for auth with SFMC
    const headers = {
        'Content-Type': 'application/json'
    }
    const authUrl = `https://${sfmcDomain}.auth.marketingcloudapis.com/v2/token`;

    const requestBody = {
        "grant_type": "client_credentials",
        "client_id": process.env.CLIENT_ID,
        "client_secret": process.env.CLIENT_SECRET,
        "account_id": process.env.ACCOUNT_ID
    }

    return axios.post(authUrl, requestBody, {
        headers
    });
}

module.exports = {
    authenticate
};
  