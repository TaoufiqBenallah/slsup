
const { Kafka } = require('kafkajs');

const brokersList = process.env.KAFKA_BROKERS;
const brokers = brokersList.split(";");

const kafka = new Kafka({
    brokers,
    sasl: {
        mechanism: process.env.KAFKA_SASL_MECHANISM,
        username: process.env.KAFKA_SASL_USERNAME,
        password: process.env.KAFKA_SASL_PASSWORD,
    },
    ssl: true,
    retry: {
        maxRetryTime: 10
    }
})

const getInstance = () => {
    return kafka;
}

module.exports.getInstance = getInstance;