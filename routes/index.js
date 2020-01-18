/**
 * @file App main router
 * @version v1.7
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2019
 * @license MIT
 */

module.exports = function (app) {
    const error = require('../controllers/errors');
    const info = require('../controllers/info_controller');
    const networks = require('../controllers/networks_controller');

    app.route('/info')
        .get(info.getInfo);
    app.route('/networks')
        .get(networks.getAllNetworks)
        .put(networks.addNetwork)
        .patch(networks.editNetwork);
    app.route('/networks/:id')
        .get(networks.getNetwork);
    app.route('/*')
        .get(error.notFound)
        .post(error.notFound)
        .put(error.notFound)
        .patch(error.notFound)
        .delete(error.notFound)
        .head(error.notFound);
};