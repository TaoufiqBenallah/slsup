const axios = require("axios");

const { equals } = require("../../../../helpers/strings/equals");

const handleEventsTopics = async (response) => {

    console.log("Events to create or update");

    // Get the event by eventDefinition key
    const { eventDefinitionKey, name, tenant } = response;
    const getEventByKey = await axios.post(`${process.env.DOMAIN}/sfmc-api/get-event`, { key: eventDefinitionKey, tenant });
    const { data } = getEventByKey;
    
    if(!data) return;
  
    // Update if event already exists and Create new Event if not 
    if(equals(data.status, 'event_not_found')) await axios.post(`${process.env.DOMAIN}/sfmc-api/create-event-definition-key`, response);
    else if(equals(data.status, 'ok')) {
      // 
      const responseProperties = Object.keys(response); 
  
      //Onny three properties needed for update, otherwise, it is an event creation with an existing eventKey
      if(equals(responseProperties.length, 3)){
        const { eventDefintion } = data;
  
        // extract data needed from exisitng event except the name
        const { dataExtensionId, sourceApplicationExtensionId, isVisibleInPicker, type } = eventDefintion;
        
        // only the name will be new
        const updatedEvent = { dataExtensionId, sourceApplicationExtensionId, isVisibleInPicker, eventDefinitionKey, name, type, tenant };
        await axios.post(`${process.env.DOMAIN}/sfmc-api/update-event`, updatedEvent)
      }else {
        // Request Date
        const date = new Date().toString();
        console.log(`${date}#${tenant}: App is trying to create an event with an existing eventDefinitionKey`);
      }
    }
}

module.exports.handleEventsTopics = handleEventsTopics;