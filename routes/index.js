/**
 * @file App main router
 * @version v1.3
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2019
 * @license MIT
 */

module.exports = function(app) {
    const info = require('../controllers/info_controller');
    const networks = require('../controllers/networks_controller');
    
    app.route('/info')
        .get(info.getInfo);
    app.route('/networks')
        .get(networks.getAllNetworks);
    app.route('/networks/:id')
        .get(networks.getNetwork);
    app.route('/*')
        .get(function(req, res){
            res.sendStatus(404);
        });
};
