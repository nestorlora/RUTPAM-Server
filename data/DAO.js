/**
 * @file Class DAO definition
 * @version v1.4
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2020
 * @license MIT
 */

const monk = require('monk');
const config = require('../config/config.json');
const dburi = config.dbuser + ':' + config.dbpass + '@' + config.dbhost + ':' + config.dbport + '/' + config.dbname;

class DAO {
    constructor(collection) {
        this.db = monk(dburi);
        if (collection) {
            this.collection = this.db.get(collection);
        } else {
            this.collection = null;
        }
    };

    static id(val) {
        return monk.id(val);
    };

    catch(err) {
        console.error(err);
    }

    find(param, callback) {
        let db = this.db;
        this.collection.find(param)
            .then(callback)
            .catch(this.catch)
            .then(() => {
                db.close();
            });
    }

    findOne(param, callback) {
        let db = this.db;
        this.collection.findOne(param)
            .then(callback)
            .catch(this.catch)
            .then(() => {
                db.close();
            });
    }

    insert(object, callback) {
        let db = this.db;
        this.collection.insert(object)
            .then(callback)
            .catch(this.catch)
            .then(() => {
                db.close();
            });
    }

    update(param, object, callback) {
        let db = this.db;
        this.collection.update(param, { $set: object })
            .then(() => {
                this.collection.find(param)
                    .then(callback)
                    .catch(this.catch)
                    .then(() => {
                        db.close();
                    });
            })
            .catch(this.catch);
    }
}

module.exports = { DAO };
