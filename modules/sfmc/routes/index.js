const router = require('express').Router();
const axios = require("axios");

const sfmcApi = require("../authentication");
const strings = require("../../../helpers/strings/equals");
const { removeTenantField } = require('../../../helpers/mappers/remove-tenant-field');

const sfmcDomain = process.env.SFMC_DOMAIN;

router.post("/add-contact-to-journey", async (req, res) => {
    try {
        // defining required fields for making the call with SFMC to add contacts to Journey
        const restUrl = `https://${sfmcDomain}.rest.marketingcloudapis.com/interaction/v1/events`;

        // extract the tenant to authenticate to the correct BU
        const { tenant } = req.body;

        // Remove the tenat field from the payload sent to SFMC
        const requestBody = removeTenantField(req.body);

        // Request Date
        const date = new Date().toString();

        // request to SFMC
        try {
            // get token
            const tokenRequest = await sfmcApi.authenticate(tenant);
            const bearerToken = "Bearer "+tokenRequest.data.access_token;

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': bearerToken
            }

            const mcResponse = await axios.post(restUrl, JSON.stringify(requestBody), {
                headers
            });
            
            const status = strings.equals(mcResponse.status,201) || strings.equals(mcResponse.status,200) ? "ok":"fail";

            
            let message = 'Contact pushed successfully';
            message = `${date}#${tenant}: ${message}`;
            console.log(message);

            res.json({status, message});

        }catch(e){
            const { response } = e;
            let { message } = response.data;
            message = `${date}#${tenant}: ${message}`;
            console.log(message);
            res.json({status: 'fail', message});
        }

    }catch(e){
        res.json({status: 'fail', message: "Country wasn't provided in the Request" });
    }
});

router.post("/get-event", async (req, res) => {
    try {

        // extract the tenant to authenticate to the correct BU
        const { key, tenant } = req.body;
        const restUrl = `https://${sfmcDomain}.rest.marketingcloudapis.com/interaction/v1/eventDefinitions/key:${key}`;

        // Request Date
        const date = new Date().toString();

        // request to SFMC
        try {

            // get token
            const tokenRequest = await sfmcApi.authenticate(tenant);
            const bearerToken = "Bearer "+tokenRequest.data.access_token;

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': bearerToken
            }

            try {
                const mcResponse = await axios.get(restUrl, {
                    headers
                });
                
                const status = strings.equals(mcResponse.status,201) || strings.equals(mcResponse.status,200) ? "ok":"fail";
                
                res.json({status, eventDefintion: mcResponse.data});
            } catch(e){
                
                let message = 'Event not found';
                message = `${date}#${tenant}: ${message}`;
                console.log(message);
                res.json({status: 'event_not_found', message});
            }

            

        } catch(e){
            const message = `${date}#${tenant}: Could not authenticate, duo to invalid provided country or SFMC issue`;
            console.log(message);
            res.json({status: 'fail', message});
        }

    }catch(e){
        res.json({status: 'fail', message: "Country wasn't provided in the Request" });
    }
});

router.post("/create-event-definition-key", async (req, res) => {
    try {
        const restUrl = `https://${sfmcDomain}.rest.marketingcloudapis.com/interaction/v1/eventDefinitions`;

        // extract the tenant to authenticate to the correct BU
        const { tenant } = req.body;

        // Remove the tenat field from the payload sent to SFMC
        const requestBody = removeTenantField(req.body);

        // request to SFMC
        try {

            // get token
            const tokenRequest = await sfmcApi.authenticate(tenant);
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
            const { response } = e;
            let { message } = response.data;
            const date = new Date().toString();
            message = `${date}#${tenant}: ${message}`;
            console.log(message);
            res.json({status: 'fail', message});
        }

    }catch(e){
        res.json({status: 'fail', message: "Country wasn't provided in the Request" });
    }
});

router.post("/update-event", async (req, res) => {
    try {
        // extract the tenant to authenticate to the correct BU
        const { eventDefinitionKey, tenant } = req.body;
        const restUrl = `https://${sfmcDomain}.rest.marketingcloudapis.com/interaction/v1/eventDefinitions/key:${eventDefinitionKey}`;

        // Remove the tenat field from the payload sent to SFMC
        const requestBody = removeTenantField(req.body);

        // request to SFMC
        try {
            // get token
           
            const tokenRequest = await sfmcApi.authenticate(tenant)
            const bearerToken = "Bearer "+tokenRequest.data.access_token;

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': bearerToken
            }

            const mcResponse = await axios.put(restUrl, JSON.stringify(requestBody), {
                headers
            });
            
            const status = strings.equals(mcResponse.status,201) || strings.equals(mcResponse.status,200) ? "ok":"fail";
            res.json({status});
        }catch(e){
            const { response } = e;
            let { message } = response.data;
            const date = new Date().toString();
            message = `${date}#${tenant}: ${message}`;
            console.log(message);
            res.json({status: 'fail', message});
        }

    }catch(e){
        res.json({status: 'fail', message: "Country wasn't provided in the Request" });
    }
});

module.exports = router;
