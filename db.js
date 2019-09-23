'use strict';
const config = require('./config.json');
var mysql = require('mysql');

// Creamos la conexión
var connection = mysql.createConnection({
    host: config.dbhost,
    port: config.dbport,
    user: config.dbuser,
    password: config.dbpass,
    database: config.dbname
});

connection.connect(function(err){
    if(err) throw err;
});

module.exports = connection;
