/**
 * @file Class IdentifiedObject definition
 * @version v2.0
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2019
 * @license MIT
 */

class IdentifiedObject extends Object {
    constructor(obj){
        super();
        if(obj.id){
            this.id = obj.id;
        }else{
            this.id = null;
        }
    }
}

module.exports = {IdentifiedObject};