require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const smfc = require('./modules/sfmc/routes');

const App = express();

App.use(bodyParser.urlencoded({ extended: false }))
App.use(bodyParser.json())

App.use("/sfmc-api", smfc);

App.listen(process.env.PORT);