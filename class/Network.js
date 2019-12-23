/**
 * @file Class Network definition
 * @version v1.1
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2019
 * @license MIT
 */

const {IdentifiedObject} = require('./IdentifiedObject');

class Network extends IdentifiedObject{
    constructor(obj){
        if(obj){
            super(obj);
            this.shortName = obj.shortName;
            this.longName = obj.longName;
        }else{
            super();
            this.shortName = null;
            this.longName = null;
        }
        return this;
    }
}

module.exports = {Network};
