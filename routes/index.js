module.exports = function(app) {
    const info = require("../controllers/info_controller");
    
    app.route('/info')
        .get(info.getInfo);

};
