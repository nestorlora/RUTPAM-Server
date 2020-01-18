/**
 * @file Data functions definition
 * @version v1.6
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2020
 * @license MIT
 */

const { DAO } = require('./DAO');
const { ArrayAdapter } = require('./ArrayAdapter');
const { ObjectAdapter } = require('./ObjectAdapter');

exports.getAll = function (collection, model, callback) {
    new DAO(collection).find({}, (results) => {
        let res = new ArrayAdapter(results, model).toModel();
        callback(res, null);
    });
}

exports.getById = function (collection, id, model, callback) {
    if (testId(id)) {
        let filter = new ObjectAdapter({ id: id }).toMongo();
        new DAO(collection).findOne(filter, (results) => {
            let res = new ObjectAdapter(results, model).toModel();
            callback([res], null);
        });
    } else {
        callback(null, error(400, "Invalid input: id MUST be a single string of 24 hex characters"));
    }
}

exports.insert = function (collection, object, model, callback) {
    object.id = null;
    let obj = new ObjectAdapter(object).toMongo();
    new DAO(collection).insert(obj, () => {
        let res = new ObjectAdapter(obj).toModel();
        callback([res], null);
    });

}

exports.update = function (collection, object, model, callback) {
    if (testId(object.id)) {
        let filter = new ObjectAdapter({ id: object.id }).toMongo();
        let obj = new ObjectAdapter(object).toMongo();
        new DAO(collection).update(filter, obj, (results) => {
            let res = new ArrayAdapter(results, model).toModel();
            callback(res, null);
        });
    } else {
        callback(null, error(400, "Invalid input: Network.id MUST be a single string of 24 hex characters"));
    }
}

function testId(value) {
    // Checks if ObjectId is exactly 24 hex chars long
    return /^([a-z]|[0-9]){24}$/.test(value);
}

function error(code, message) {
    return {
        code: code,
        text: message
    };
}
