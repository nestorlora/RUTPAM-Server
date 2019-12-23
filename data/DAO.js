/**
 * @file Class DAO definition
 * @version v1.0
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2019
 * @license MIT
 */

const monk = require('monk');
const config = require('../config/config.json');
const dburi = config.dbuser+':'+config.dbpass+'@'+config.dbhost+':'+config.dbport+'/'+config.dbname;

class DAO {
    constructor(collection){
        this.db = monk(dburi);
        if(collection){
            this.collection = this.db.get(collection);
        }else{
            this.collection = null;
        }
    };

    catch(err){
        console.error(err);
    }

    find(param, callback){
        let db = this.db;
        this.collection.find(param)
        .then(callback)
        .catch(this.catch)
        .then(()=>{
            db.close();
        });
    }
}

module.exports = {DAO};
