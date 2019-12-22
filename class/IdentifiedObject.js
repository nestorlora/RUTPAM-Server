/**
 * @file Class IdentifiedObject definition
 * @version v1.1
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2019
 * @license MIT
 */

class IdentifiedObject extends Object {
    constructor(obj){
        super();
        if(obj._id){
            this._id = obj._id;
        }else if(obj.id){
            this._id = obj.id;
        }else{
            this._id = null;
        }
    }
    get id(){
        return this._id;
    }

    set id(val){
        this._id = val;
        return this._id;
    }
    export(){
        let copy = Object.assign({}, this);
        copy.id = copy._id;
        delete copy._id;
        return copy;
    }
}

module.exports = {IdentifiedObject};