/**
 * @file Class ObjectAdapter definition
 * @version v1.0
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2020
 * @license MIT
 */

const monk = require('monk');

class ObjectAdapter extends Object {
    constructor(obj, obj_class) {
        super();
        if (obj._id) {
            obj.id = obj._id;
            delete obj._id;
        }
        Object.assign(this, obj);
        //return this;
    }

    toModel() {
        let obj = Object.assign({}, this);
        obj.id = String(obj.id);
        return obj;
    }

    toMongo() {
        let obj = Object.assign({}, this);
        obj._id = monk.id(obj.id);
        delete obj.id;
        return obj;
    }
}

module.exports = { ObjectAdapter };
