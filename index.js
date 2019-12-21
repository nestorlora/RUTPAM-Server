'use strict'
// Library imports
const express = require('express');
const cors = require('cors');
const app = express();
const config = require('./config/config.json');
// Express app
app.listen(config.port, () => console.log('RUTPAM-Server v'+config.version+' listening on port '+config.port));
app.use(cors());

app.get('/info', function(req, res){
    let info = {
        'version': config.version,
        'contact': config.admin,
        'web': config.web,
        'maintenance': config.maintenance
    };
    res.status(200).json(info).end();
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
