/**
 * @file Class DB definition
 * @version v1.0
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2019
 * @license MIT
 */

const monk = require('monk');
const config = require("../config/config.json");
const dburi = config.dbuser+':'+config.dbpass+'@'+config.dbhost+':'+config.dbport+'/'+config.dbname;

class DB {
    constructor(collection){
        this.db = monk(dburi);
        if(collection){
            this.collection = this.db.get(collection);
        }else{
            this.collection = null;
        }
    };
    open(collection){
        if(this.db === null){
            this.db = monk(dburi);
        }
        if(collection){
            this.collection = this.db.get(collection);
        }
    };
    catch(err){
        console.error(err);
    }
    find(param, next){
        let db = this.db;
        this.collection.find(param)
        .then(next)
        .catch(this.catch)
        .then(()=>{
            db.close();
        });
    }
}

module.exports = {DB};
