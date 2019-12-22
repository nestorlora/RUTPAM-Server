'use strict'
// Library imports
const express = require('express');
const cors = require('cors');
const app = express();
const monk = require('monk');
// Custom classes imports
const {Network} = require("./class/Network.js");
// Configuration import
const config = require('./config/config.json');
// Constant parameters
const dburi = config.dbuser+':'+config.dbpass+'@'+config.dbhost+':'+config.dbport+'/'+config.dbname;

// Express app
app.listen(config.port, () => console.log('RUTPAM-Server v'+config.version+' listening on port '+config.port));
app.use(cors());
var routes = require("./routes/index");
routes(app);

/*app.get('/info', function(req, res){
    let info = {
        'version': config.version,
        'contact': config.admin,
        'web': config.web,
        'maintenance': config.maintenance
    };
    res.status(200).json(info).end();
});*/

app.get('/networks', function(req, res){
    let db = monk(dburi);
    let networks = db.get('networks');
    networks.find({}).then((results)=>{
        let aux = new Array();
        for(let i = 0; i < results.length; i++){
            aux.push(new Network(results[i]).export());
        }
        res.status(200).json(aux);
    }).catch((err)=>{
        console.error(err);
    }).then(()=>{
        db.close();
        res.end();
    });
});

app.get('/networks/:id', function(req, res){
    let db = monk(dburi);
    let networks = db.get('networks');
    networks.find({id: req.param.id}).then((results)=>{
        console.log("Get one network");
        //console.log(results);
    }).catch((err)=>{
        console.error(err);
    }).then(()=>{
        db.close();
    });
});

/*
app.get('/tipos_subida_bajada', function(req, res){
    if(req.query.id){
        var id = Number(req.query.id);
        db.query('SELECT * FROM `pickup_dropoff_types` WHERE `id` = '+id, function(err, rows, fields){
            if(err) throw err;
            res.status(200).json(rows).end();
        });
    }else{
        db.query('SELECT * FROM `pickup_dropoff_types`', function(err, rows, fields){
            if(err) throw err;
            res.status(200).json(rows).end();
        });
    }
});
*/

// To be implemented
app.get('/*', function(req, res){
    res.sendStatus(418);
});
