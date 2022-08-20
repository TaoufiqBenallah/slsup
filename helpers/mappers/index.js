const { equals } = require("../strings/equals.js");
const { Topics } = require("../../modules/kafka/topics/index.js");

const schemaChecker = (schema, tenant, date) => {
    if(!schema) return false;

    const { fields, sendableCustomObjectField, SendableSubscriberField} = schema;

    // all fields has to be not null or undefined or empty
    const fieldsChecker = !equals(fields, undefined) && !equals(fields, null) && !equals(fields.length, 0);
    const sendableCustomObjectFieldChecker = !equals(sendableCustomObjectField, undefined) && !equals(sendableCustomObjectField, null);
    const SendableSubscriberFieldChecker = !equals(SendableSubscriberField, undefined) && !equals(SendableSubscriberField, null);

    if(!fieldsChecker){
        console.log(`${date}#${tenant}: fields sent in the topic are either empty or null`);
        return false;
    }
    if(!sendableCustomObjectFieldChecker){
        console.log(`${date}#${tenant}: sendableCustomObjectField sent in the topic is either empty or null`);
        return false;
    }
    if(!SendableSubscriberFieldChecker){
        console.log(`${date}#${tenant}: SendableSubscriberField sent in the topic is either empty or null`);
        return false;
    }

    // App is setting up the sendable DE with a usbcriber key
    const isBothSendableAttributeEquals = equals(sendableCustomObjectField, SendableSubscriberField);

    if(!isBothSendableAttributeEquals) {
        console.log(`${date}#${tenant}: sendableCustomObjectField & SendableSubscriberField are not the same`);
        return false;
    }

    // Does the fields has a subscriber key defined in the sendableCustomObjectField
    const subkeyField = fields.find(item => equals(item.name, sendableCustomObjectField));
    const isSubKeyMappedInFields = !equals(subkeyField, undefined);

    if(!isSubKeyMappedInFields){
        console.log(`${date}#${tenant}: List of fields sent does not have a field that can be desciber as subscriber key`);
        return false;  
    }

    return true;
}

const firstTopicChecker = (response) => {
    
    const date = new Date().toString();

    // check if al lrequired field coming from the topics are enough
    // for SFMC when sending the request
    const { type, mode, eventDefinitionKey, dataExtensionName, schema, sourceApplicationExtensionId, tenant, name } = response;
    
    // Required for creating event or updating it 
    const isCountryAvailable = tenant && !equals(tenant, "");
    const isNameAvailable = name && !equals(name, "");
    const isEventDefinitionKeyValid = !equals(eventDefinitionKey, undefined) && !equals(eventDefinitionKey, "");

    // required for creating an event
    const isTypeEvent = equals(type, "APIEvent") && !equals(type, undefined);
    const isModeProduction = equals(mode, "Production") && !equals(mode, undefined);
    const isSourceAppExtensionIdProvided = sourceApplicationExtensionId && !equals(sourceApplicationExtensionId, "");
    const isDataExtensionNameValid = !equals(dataExtensionName, undefined) && !equals(dataExtensionName, "");
    const isSchemaCorrect = schemaChecker(schema, tenant, date);

    // if the fields required for the creation of the events are all false, and field required for update are available, then it is an update request, so format is true
    // if the fields required for the creation of the events are all true, and field required for update/creation(first three) are available, then it is a creation request, so format is true
    // else it is incorrect
    const fieldsNotForUpdateChecker = equals(type, undefined) && equals(mode, undefined) && equals(sourceApplicationExtensionId, undefined) && equals(dataExtensionName, undefined) && equals(schema, undefined);
    const fieldsForUpdateChecker = isCountryAvailable && isNameAvailable && isEventDefinitionKeyValid;

    if(fieldsNotForUpdateChecker && fieldsForUpdateChecker) {
        const message = `${date}#${tenant}: This is an update NAME EVENT topic - IN PROGRESS`;
        console.log(message);
        return true;
    }

    if(fieldsForUpdateChecker && isTypeEvent && isModeProduction && isDataExtensionNameValid && isSchemaCorrect && isSourceAppExtensionIdProvided){
        const message = `${date}#${tenant}: This is a creation EVENT topic - IN PROGRESS`;
        console.log(message);
        return true;
    }

    const message = `${date}#${tenant}: Data Structure received in the TOPIC is invalid or unsupported`;
    console.log(message);
    return false;
}

const secondTopicChecker = (response) => {
    const { EventDefinitionKey, Data, tenant } = response;

    return !equals(EventDefinitionKey, undefined) && !equals(EventDefinitionKey, "") && !equals(Data, undefined) && !equals(Data, null) && !equals(tenant, undefined) && !equals(tenant, "");
}

const formatChecker = (response,topic) => {
    if(equals(Topics.EVENTS, topic)) return firstTopicChecker(response)
    else if(equals(Topics.CONTACTS, topic)) return secondTopicChecker(response);
    else return false;
}

module.exports.formatChecker = formatChecker;