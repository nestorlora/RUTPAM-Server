/**
 * @file Controller functions for /info
 * @version v1.0
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2019
 * @license MIT
 */

config = require("../config/config.json");

exports.getInfo = function(req, res){
    let info = {
        'version': config.version,
        'contact': config.admin,
        'web': config.web,
        'maintenance': config.maintenance
    };
    res.status(200).json(info).end();
}