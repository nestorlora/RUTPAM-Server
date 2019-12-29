/**
 * @file Error handlers file
 * @version v1.0
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2019
 * @license MIT
 */

const {ApiResponse} = require('../models/ApiResponse');

exports.notFound = function(req, res){
   new ApiResponse(404).send(null, res);
}

exports.notImplemented = function (req, res) {
   new ApiResponse(501).send(null, res);
}
