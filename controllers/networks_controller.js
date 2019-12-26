/**
 * @file Controller functions for /networks
 * @version v1.3
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2019
 * @license MIT
 */

const data = require('../data/data');
const {Network} = require('../models/Network');

exports.getAllNetworks = function(req, res){
    data.getAll('networks', Network, (data, err)=>{
        res.status(200).json(data).end();
    });
}

exports.getNetwork = function(req, res){
    let id = req.params.id;
    data.getById('networks', id, Network, (data, err)=>{
        callback(res, data, err);
    });
}

exports.editNetwork = function(req, res){
    let net = req.body;
    data.update('networks', net, Network, (data, err)=>{
        callback(res, data, err);
    });
}

var callback = function (res, data, err){
    if(err){
        res.status(err.code).send(err.text).end();
    }else{
        res.status(200).json(data).end();
    }
}
