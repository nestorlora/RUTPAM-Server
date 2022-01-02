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
// Version
const version:String = require('./../package.json').version;

// Express app
const app = express();
app.set('version', version);
app.set('server_name', process.env.SERVER_NAME);
app.set('contact', process.env.SERVER_ADMIN);
app.set('web', process.env.SERVER_WEB);
app.set('maintenance', false);
app.listen(process.env.APP_PORT, () => console.log('RUTPAM-Server v' + version + ' listening on port ' + process.env.APP_PORT));
app.use(express.json());
app.use(cors());

import routes from "./routes/index";
routes(app);