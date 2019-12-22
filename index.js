'use strict'
// Library imports
const express = require('express');
const cors = require('cors');
const app = express();
// Custom classes imports
const {Network} = require("./class/Network.js");
const {DB} = require("./class/DB");
// Configuration import
const config = require('./config/config.json');

// Express app
app.listen(config.port, () => console.log('RUTPAM-Server v'+config.version+' listening on port '+config.port));
app.use(cors());
var routes = require("./routes/index");
routes(app);

app.get('/networks', function(req, res){
    new DB('networks').find({}, (results)=>{
        let aux = new Array();
        for(let i = 0; i < results.length; i++){
            aux.push(new Network(results[i]).export());
        }
        res.status(200).json(aux).end();
    });
});

app.get('/networks/:id', function(req, res){
    new DB('networks').find({id: req.param.id}, (results)=>{
        let aux = new Array();
        for(let i = 0; i < results.length; i++){
            aux.push(new Network(results[i]).export());
        }
        res.status(200).json(aux).end();
    });
});


// To be implemented
app.get('/*', function(req, res){
    res.sendStatus(418);
});
