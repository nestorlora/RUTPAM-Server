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