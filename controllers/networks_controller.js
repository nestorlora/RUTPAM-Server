/**
 * @file Controller functions for /networks
 * @version v1.0
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2019
 * @license MIT
 */

const data = require('../data/data');
const {Network} = require('../class/Network');

exports.getAllNetworks = function(req, res){
    data.getAll('networks', Network, (data, err)=>{
        res.status(200).json(data).end();
    });
}
