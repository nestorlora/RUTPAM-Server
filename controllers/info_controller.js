/**
 * @file Controller functions for /info
 * @version v1.2
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2019
 * @license MIT
 */

const config = require("../config/config.json");
const version = require("../config/const.json").version;

exports.getInfo = function (req, res) {
    let info = {
        'version': version,
        'contact': config.admin,
        'web': config.web,
        'maintenance': config.maintenance
    };
    res.status(200).json(info).end();
}