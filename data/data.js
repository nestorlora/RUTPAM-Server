/**
 * @file Data functions definition
 * @version v1.0
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2019
 * @license MIT
 */

const {DAO} = require('./DAO');
const {ObjectAdapter} = require('./ObjectAdapter');

exports.getAll = function(collection, model, callback){
    new DAO(collection).find({}, (results)=>{
        let res = new ObjectAdapter(results, model).toModel();
        callback(res, null);
    });
}
