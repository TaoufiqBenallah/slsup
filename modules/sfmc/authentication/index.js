const axios = require('axios');
const { equals } = require('../../../helpers/strings/equals');
const sfmcDomain = process.env.SFMC_DOMAIN;

const authenticate = async (tenant) => {
    // defining required fields for auth with SFMC
    const headers = {
        'Content-Type': 'application/json'
    }
    const authUrl = `https://${sfmcDomain}.auth.marketingcloudapis.com/v2/token`;

    const accounts = process.env.ACCOUNT_ID.split("-");
    const account = accounts.find(item => {
        const tenantFromItem = item.split(":")[0];
        return equals(tenant, tenantFromItem);
    });

    if(account){
        const accountId = account.split(":")[1];

        const requestBody = {
            "grant_type": "client_credentials",
            "client_id": process.env.CLIENT_ID,
            "client_secret": process.env.CLIENT_SECRET,
            "account_id": accountId
        }

        return axios.post(authUrl, requestBody, {
            headers
        });
    }

    return;
}

module.exports = {
    authenticate
};