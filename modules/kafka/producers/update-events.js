const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  brokers: ['renewing-raptor-11840-us1-kafka.upstash.io:9092'],
  sasl: {
    mechanism: 'scram-sha-256',
    username: 'cmVuZXdpbmctcmFwdG9yLTExODQwJBQw1_GdguElzzbyo6g0BtyU8A737sxhDOE',
    password: '_axMHSzsyaL95Jqnr0b2Lu_haIiMPOIYEHFTRic0P5B5dRLkZ2Hkvmjgfkgfz5XxsPgCFg==',
  },
  ssl: true,
});

const producer = kafka.producer();

const run = async () => {
  // Producing
  const num = Math.random();
  const nm = num < 0.25 ? "TB": (num < 0.5 ? "ISS": (num < 0.75 ? "IV": "JK"));
  const pi = "API-"+Math.floor(Math.random()*1000000000000000000000);

  const eventDefKey = {
    "tenant": "DEV",
    "name": "API-RBKO-BU-v2.3333 - updated",
    "eventDefinitionKey": "APIEvent-41e7cdd3-ee84-58ac-81a0-26546d286bec",
  }

  await producer.connect()
  await producer.send({
    topic: 'EVENTS',
    messages: [
      { value: Buffer.from(JSON.stringify(eventDefKey))},
    ],
  });
}

run().catch(console.error)