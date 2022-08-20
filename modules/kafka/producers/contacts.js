const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  brokers: ['renewing-raptor-11840-us1-kafka.upstash.io:9092'],
  sasl: {
    mechanism: 'scram-sha-256',
    username: 'cmVuZXdpbmctcmFwdG9yLTExODQwJBQw1_GdguElzzbyo6g0BtyU8A737sxhDOE',
    password: '_axMHSzsyaL95Jqnr0b2Lu_haIiMPOIYEHFTRic0P5B5dRLkZ2Hkvmjgfkgfz5XxsPgCFg==',
  },
  ssl: true,
})

const producer = kafka.producer();

let counter = 0;
const run = async (def) => {
  // Producing

  const eventDefKey = def;
  

  await producer.connect()
  await producer.send({
    topic: 'CONTACTS',
    messages: [
      { value: Buffer.from(JSON.stringify(eventDefKey))},
    ], 
  });

}


setInterval(function(){
  counter = counter + 1;
  if(counter < 11) {
    const probabilities = [1,2,3];
    const highProbs = [1,1,1,0];

    const rndP = probabilities[Math.floor(Math.random()*probabilities.length)];

    if(rndP === 1){
      const rndHP = highProbs[Math.floor(Math.random()*highProbs.length)];
      if(rndHP === 1){
        
        const dr = ["beluxshop3@gmail.com", "taoufiq.benallah@gmail.com", "taoufiq.benallah@emea.merkleinc.com", "b.taoufiq@pulse.digital"];
        const firstNames = ["Taoufiq", "Edris", "Ivan", "Lucian", "Ori", "Edi", "Emanuella", "Ahmed", "Enrique"];
        const lastNames = ["Benallah", "Urcan", "Ahmady", "Diaz", "Gross", "Simona"];
        const ages = ["25", "19", "18", "32", "29", "45"]
        
        const ck = Math.random() * 10000000000000000000000000000000000;
    
          const eventDEF = {
            "tenant": "RBKO",
            "ContactKey": ck,
            "EventDefinitionKey":"APIEvent-41e6cdc3-ee84-58ac-81a0-37246d286bec",
            "Data": {
                "FullName":firstNames[Math.floor(Math.random()*firstNames.length)] + " " + lastNames[Math.floor(Math.random()*lastNames.length)],
                "subscriberKey":ck,
                "Email": dr[Math.floor(Math.random()*dr.length)],
                "Engaged": Math.random() > 0.5,
                "Age": ages[Math.floor(Math.random()*ages.length)]
            }
          }
        run(eventDEF).catch(console.error);

      } else {
        const dr = ["beluxshop3@gmail.com", "taoufiq.benallah@gmail.com", "taoufiq.benallah@emea.merkleinc.com", "b.taoufiq@pulse.digital"];
        const firstNames = ["Taoufiq", "Edris", "Ivan", "Lucian", "Ori", "Edi", "Emanuella", "Ahmed", "Enrique"];
        const lastNames = ["Benallah", "Urcan", "Ahmady", "Diaz", "Gross", "Simona"];
        const ages = ["25", "19", "18", "32", "29", "45"]
        
        const ck = Math.random() * 10000000000000000000000000000000000;
        const eventDEF = {
          "tenant": "RBKO",
          "ContactKey": ck,
          "EventDefinitionKey": "APIEvent-41e6cdc3-ee84-58ac-81a0-37246d286bec",
          "Data": {
            "FullName":firstNames[Math.floor(Math.random()*firstNames.length)] + " " + lastNames[Math.floor(Math.random()*lastNames.length)],
              "subscriberKey": ck,
              "Email": dr[Math.floor(Math.random()*dr.length)],
              "Engaed": Math.random() > 0.5
          }
        }

        run(eventDEF).catch(console.error);
      }
    }else if(rndP === 2) {
      const rndHP = highProbs[Math.floor(Math.random()*highProbs.length)];
      if(rndHP === 1){
        
        const dr = ["beluxshop3@gmail.com", "taoufiq.benallah@gmail.com", "taoufiq.benallah@emea.merkleinc.com", "b.taoufiq@pulse.digital"];
        const firstNames = ["Taoufiq", "Edris", "Ivan", "Lucian", "Ori", "Edi", "Emanuella", "Ahmed", "Enrique"];
        const lastNames = ["Benallah", "Urcan", "Ahmady", "Diaz", "Gross", "Simona"];
    
        const ck = Math.random() * 10000000000000000000000000000000000;
        const ages = ["25", "19", "18", "32", "29", "45"]
        
          const eventDEF = {
            "tenant": "DEV",
            "ContactKey": ck,
            "EventDefinitionKey":"APIEvent-41e6cdc3-ee82-58ac-81a0-36246d286bec",
            "Data": {
                "FullName":firstNames[Math.floor(Math.random()*firstNames.length)] + " " + lastNames[Math.floor(Math.random()*lastNames.length)],
                "subscriberKey":ck,
                "Email": dr[Math.floor(Math.random()*dr.length)],
                "Engaged": Math.random() > 0.5,
                "Age":"89"
            }
          }
        run(eventDEF).catch(console.error);

      } else {
        const dr = ["beluxshop3@gmail.com", "taoufiq.benallah@gmail.com", "taoufiq.benallah@emea.merkleinc.com", "b.taoufiq@pulse.digital"];
        const firstNames = ["Taoufiq", "Edris", "Ivan", "Lucian", "Ori", "Edi", "Emanuella", "Ahmed", "Enrique"];
        const lastNames = ["Benallah", "Urcan", "Ahmady", "Diaz", "Gross", "Simona"];
        
        const ck = Math.random() * 10000000000000000000000000000000000;
        const eventDEF = {
          "tenant": "DEVO",
          "ContactKey": ck,
          "EventDefinitionKey":"APIEvent-41e6cdc3-ee82-58ac-81a0-36246d286bec",
          "Data": {
              "FullName":firstNames[Math.floor(Math.random()*firstNames.length)] + " " + lastNames[Math.floor(Math.random()*lastNames.length)],
              "subscriberKey": ck,
              "Email": dr[Math.floor(Math.random()*dr.length)],
              "Engaged": Math.random() > 0.5,
              "Age":"88"
          }
        }

        run(eventDEF).catch(console.error);
      }
    }else if(rndP === 3){
      const rndHP = highProbs[Math.floor(Math.random()*highProbs.length)];
      if(rndHP === 1){
        
        const dr = ["beluxshop3@gmail.com", "taoufiq.benallah@gmail.com", "taoufiq.benallah@emea.merkleinc.com", "b.taoufiq@pulse.digital"];
        const firstNames = ["Taoufiq", "Edris", "Ivan", "Lucian", "Ori", "Edi", "Emanuella", "Ahmed", "Enrique"];
        const lastNames = ["Benallah", "Urcan", "Ahmady", "Diaz", "Gross", "Simona"];
    
        const ck = Math.random() * 10000000000000000000000000000000000;
    
          const eventDEF = {
            "tenant": "DEV",
            "ContactKey": ck,
            "EventDefinitionKey":"APIEvent-41e7cdc3-ee84-58ac-81a0-37246d286bec",
            "Data": {
                "FullName":firstNames[Math.floor(Math.random()*firstNames.length)] + " " + lastNames[Math.floor(Math.random()*lastNames.length)],
                "subscriberKey":ck,
                "Email": dr[Math.floor(Math.random()*dr.length)],
                "Engaged": Math.random() > 0.5
            }
          }
        run(eventDEF).catch(console.error);

      } else {
        const dr = ["beluxshop3@gmail.com", "taoufiq.benallah@gmail.com", "taoufiq.benallah@emea.merkleinc.com", "b.taoufiq@pulse.digital"];
        const firstNames = ["Taoufiq", "Edris", "Ivan", "Lucian", "Ori", "Edi", "Emanuella", "Ahmed", "Enrique"];
        const lastNames = ["Benallah", "Urcan", "Ahmady", "Diaz", "Gross", "Simona"];
        const ages = ["25", "19", "18", "32", "29", "45"]
        
        const ck = Math.random() * 10000000000000000000000000000000000;
        const eventDEF = {
          "tenant": "DEV",
          "ContactKey": ck,
          "EventDefinitionKey":"APIEvent-41e7cdc3-zx84-58ac-81a0-37246d286b0c",
          "Data": {
              "FullName":firstNames[Math.floor(Math.random()*firstNames.length)] + " " + lastNames[Math.floor(Math.random()*lastNames.length)],
              "subscriberKey": ck,
              "Email": dr[Math.floor(Math.random()*dr.length)],
              "Engaged": Math.random() > 0.5
          }
        }

        run(eventDEF).catch(console.error);
      }
    }
  }
}, 3000);
