const router = require('express').Router();
const axios = require("axios");

const sfmcApi = require("../authentication");
const strings = require("../../../helpers/strings");

const sfmcDomain = process.env.SFMC_DOMAIN;

router.post("/add-contact-to-journey", async (req, res) => {
    try {
        // defining required fields for making the call with SFMC to add contacts to Journey
        const restUrl = `https://${sfmcDomain}.rest.marketingcloudapis.com/interaction/v1/events`;
        const requestBody = req.body;

        // request to SFMC
        try {
            // get token
           
            const tokenRequest = await sfmcApi.authenticate();
            const bearerToken = "Bearer "+tokenRequest.data.access_token;

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': bearerToken
            }

            const mcResponse = await axios.post(restUrl, JSON.stringify(requestBody), {
                headers
            });
            
            const status = strings.equals(mcResponse.status,201) || strings.equals(mcResponse.status,200) ? "ok":"fail";
            res.json({status});
        }catch(e){
            res.sendStatus(e.response.status);
        }

    }catch(e){
        res.sendStatus(500).json({message: "Error"})
    }
});

router.post("/create-event-definition-key", async (req, res) => {
    try {
        // defining required fields for making the call with SFMC to add contacts to Journey
        const restUrl = `https://${sfmcDomain}.rest.marketingcloudapis.com/interaction/v1/eventDefinitions`;
        const requestBody = req.body;

        // request to SFMC
        try {
            // get token
           
            const tokenRequest = await sfmcApi.authenticate()
            const bearerToken = "Bearer "+tokenRequest.token;

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': bearerToken
            }

            const mcResponse = await axios.post(restUrl, JSON.stringify(requestBody), {
                headers
            });
            
            const status = strings.equals(mcResponse.status,201) || strings.equals(mcResponse.status,200) ? "ok":"fail";
            res.json({status});
        }catch(e){
            res.sendStatus(e.response.status);
        }

    }catch(e){
        res.sendStatus(500).json({message: "Error"})
    }
});

module.exports = router;
