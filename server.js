require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const smfc = require('./modules/sfmc/routes');
const { run } = require('./modules/kafka/consumers/run')

const App = express();

App.use(bodyParser.urlencoded({ extended: false }))
App.use(bodyParser.json())

App.use("/sfmc-api", smfc);

run().catch(console.error);

App.listen(process.env.PORT || 3000);