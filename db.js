'use strict';
// Imports
const config = require('./config.json');
var mysql = require('mysql');
// Definition of the connection
var connection = mysql.createConnection({
    host: config.dbhost,
    port: config.dbport,
    user: config.dbuser,
    password: config.dbpass,
    database: config.dbname
});
// Opening the connection
connection.connect(function(err){
    if(err) throw err;
});
// Exports
module.exports = connection;
