/**
 * @file Express app main file
 * @version v1.5
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2019
 * @license MIT
 */

'use strict'
// Library imports
const express = require('express');
const cors = require('cors');
// Configuration import
const config = require('./config/config.json');

// Express app
const app = express();
app.listen(config.port, () => console.log('RUTPAM-Server v' + config.version + ' listening on port ' + config.port));
app.use(express.json());
app.use(cors());
var routes = require("./routes/index");
routes(app);
