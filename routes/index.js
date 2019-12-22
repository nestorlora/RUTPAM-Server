/**
 * @file App main router
 * @version v1.0
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2019
 * @license MIT
 */

module.exports = function(app) {
    const info = require("../controllers/info_controller");
    
    app.route('/info')
        .get(info.getInfo);

};
