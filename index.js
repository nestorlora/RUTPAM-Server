'use strict'
// Library imports
const express = require('express');
const cors = require('cors');
// Configuration import
const config = require('./config/config.json');

// Express app
const app = express();
app.listen(config.port, () => console.log('RUTPAM-Server v'+config.version+' listening on port '+config.port));
app.use(cors());
var routes = require("./routes/index");
routes(app);

// To be implemented
app.get('/*', function(req, res){
    res.sendStatus(418);
});
