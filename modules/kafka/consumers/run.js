const { Topics } = require("./../topics/index.js");
const { formatChecker } = require("./../../../helpers/mappers/index.js");
const { equals } = require('../../../helpers/strings/equals.js');
const { getInstance } = require('../instance/index.js');
const { handleEventsTopics } = require("../topics/handlers/events.js");
const { handleContactsTopics } = require("../topics/handlers/contacts.js");

const run = async () => {

    const kafka = getInstance();
  
    const consumer = kafka.consumer({ groupId: 'kafka' })
  
    // Consuming
    await consumer.connect()
    await consumer.subscribe({ topics: [Topics.EVENTS, Topics.CONTACTS], fromBeginning: true })
  
    await consumer.run({
      eachMessage: async (d) => {

        // get the Topic 
        const { topic, message } = d;
        const response = JSON.parse(message.value.toString());

        // Input Checker
        const responseHasValidFormat = formatChecker(response, topic);

        // if format of the topic isn't valid we don't continue

        if(!responseHasValidFormat) return;
        
        // Create or Update an event
        if(equals(topic,Topics.EVENTS)) await handleEventsTopics(response);

        // Push Contact to the Journey
        if(equals(topic,Topics.CONTACTS)) await handleContactsTopics(response);
        
      },
    })
  
  }

module.exports.run = run;