/**
 * @file Express app main file
 * @version v1.6
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2020
 * @license MIT
 */

'use strict'
// Library imports
const express = require('express');
const cors = require('cors');
// Configuration import
const config = require('./config/config.json');
const version = require("./config/const.json").version;

// Express app
const app = express();
app.listen(config.port, () => console.log('RUTPAM-Server v' + version + ' listening on port ' + config.port));
app.use(express.json());
app.use(cors());
var routes = require("./routes/index");
routes(app);
