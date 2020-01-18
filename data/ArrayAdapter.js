/**
 * @file Class ObjectAdapter definition
 * @version v1.0
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2020
 * @license MIT
 */

const monk = require('monk');

class ArrayAdapter extends Array {
    constructor(object_array, object_class) {
        super();
        for (let i = 0; i < object_array.length; i++) {
            if (object_array[i]._id) {
                // Change object id from Mongo scheme to RUTPAM scheme
                object_array[i].id = object_array[i]._id;
            }
            this[i] = new object_class(object_array[i]);
        }
        //return this;
    }

    toModel() {
        let arr = new Array();
        for (let i = 0; i < this.length; i++) {
            let copy = Object.assign({}, this[i]);
            copy.id = String(copy.id);
            arr.push(copy);
        }
        return arr;
    }

    toMongo() {
        let arr = new Array();
        for (let i = 0; i < this.length; i++) {
            let copy = Object.assign({}, this[i]);
            copy._id = monk.id(copy.id);
            delete copy.id;
            arr.push(copy);
        }
        return arr;
    }
}

module.exports = { ArrayAdapter };
