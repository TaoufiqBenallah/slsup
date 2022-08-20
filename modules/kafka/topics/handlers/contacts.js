const axios = require("axios");

const { equals } = require("../../../../helpers/strings/equals");

const handleContactsTopics = async(response) => {

    const { EventDefinitionKey, tenant } = response;
    const getEventByKey = await axios.post(`${process.env.DOMAIN}/sfmc-api/get-event`, { key: EventDefinitionKey, tenant });
    const { data } = getEventByKey;
    
    if(!data) return;
    
    if(equals(data.status, 'ok')) {
      const { ContactKey, Data } = response;
      const contactData = { EventDefinitionKey, ContactKey, Data, tenant };
      await axios.post(`${process.env.DOMAIN}/sfmc-api/add-contact-to-journey`, contactData);
    } else if(equals(data.status, 'event_not_found')) {
      // Request Date
      const date = new Date().toString();
      console.log(`${date}#${tenant}: App is trying to push a contact in a nonexisting event`);
    }
}

module.exports.handleContactsTopics = handleContactsTopics;