'use strict'
const express = require('express');
const cors = require('cors');
const app = express();
const config = require('./config.json');
const db = require('./db');
app.listen(config.port, () => console.log('RUTPAM-Server v'+config.version+' escuchando en el puerto '+config.port));
app.use(cors());

app.get('/info', function(req, res){
    let info = {
        'version': config.version,
        'contacto': config.admin,
        'web': config.web,
        'mantenimiento': config.maintenance
    };
    res.status(200).json(info).end();
});

app.get('/tipos_subida_bajada', function(req, res){
    if(req.query.id){
        var id = Number(req.query.id);
        db.query('SELECT * FROM `tipos_subida_bajada` WHERE `id` = '+id, function(err, rows, fields){
            if(err) throw err;
            res.status(200).json(rows).end();
        });
    }else{
        db.query('SELECT * FROM `tipos_subida_bajada`', function(err, rows, fields){
            if(err) throw err;
            res.status(200).json(rows).end();
        });
    }
});

// To be implemented
app.get('/*', function(req, res){
    res.sendStatus(418);
})