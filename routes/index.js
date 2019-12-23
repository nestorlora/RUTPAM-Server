/**
 * @file App main router
 * @version v1.1
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2019
 * @license MIT
 */

module.exports = function(app) {
    const info = require('../controllers/info_controller');
    
    app.route('/info')
        .get(info.getInfo);

    app.route('/*')
        .get(function(req, res){
            res.sendStatus(418);
        });
};
