/**
 * @file Express server main file
 * @version v1.8.2
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2020
 * @license MIT
 */

'use strict'
import express from 'express';
import cors from 'cors';

// Env Variables import
import * as dotenv from 'dotenv';
dotenv.config();
const version:String = require('./../package.json').version;
const port:String|Number = process.env.APP_PORT || 5000;
const server_name:String = process.env.SERVER_NAME || "RUTPAM Server";
const contact:String = process.env.SERVER_ADMIN || "";
const web:String = process.env.SERVER_WEB || "";

// Configuring Express app
const app = express();
app.set('version', version);
app.set('server_name', server_name);
app.set('contact', contact);
app.set('web', web);
app.set('maintenance', false);
app.use(express.json(), cors());

// Start server
app.listen(port, () => {
    console.log('RUTPAM-Server v' + version + ' listening on port ' + port)
});

import routes from "./routes/index";
routes(app);