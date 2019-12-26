/**
 * @file Data functions definition
 * @version v1.1
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2019
 * @license MIT
 */

const {DAO} = require('./DAO');
const {ArrayAdapter} = require('./ArrayAdapter');
const {ObjectAdapter} = require('./ObjectAdapter');

exports.getAll = function(collection, model, callback){
    new DAO(collection).find({}, (results)=>{
        let res = new ArrayAdapter(results, model).toModel();
        callback(res, null);
    });
}

function testId(value){
    // Checks if ObjectId is exactly 24 hex chars long
    return /^([a-z]|[0-9]){24}$/.test(value);
}

function error(code, message){
    return {
        code: code,
        text: message
    };
}
