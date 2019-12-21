/**
 * @file Class IdentifiedObject definition
 * @version v1.0
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2019
 * @license MIT
 */

class IdentifiedObject extends Object {
    constructor(obj){
        super();
        if(obj){
            this._id = obj._id;
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
    import(obj){
        // TODO Implement
    }
}

module.exports = {IdentifiedObject};