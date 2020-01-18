/**
 * @file Controller functions for /networks
 * @version v1.6
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2019
 * @license MIT
 */

const data = require('../data/data');
const { Network } = require('../models/Network');
const { ApiResponse } = require('../models/ApiResponse');

exports.getAllNetworks = function (req, res) {
    data.getAll('networks', Network, (data, err) => {
        callback(res, data, err);
    });
}

exports.getNetwork = function (req, res) {
    let id = req.params.id;
    data.getById('networks', id, Network, (data, err) => {
        callback(res, data, err);
    });
}

exports.addNetwork = function (req, res) {
    let net = new Network(req.body);
    data.insert('networks', net, Network, (data, err) => {
        callback(res, data, err);
    })
}

exports.editNetwork = function (req, res) {
    let net = new Network(req.body);
    data.update('networks', net, Network, (data, err) => {
        callback(res, data, err);
    });
}

var callback = function (res, data, err) {
    if (err) {
        new ApiResponse(err.code, err.text).send(null, res);
    } else {
        new ApiResponse(200).send({ networks: data }, res);
    }
}
