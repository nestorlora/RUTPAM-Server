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
    /*get(id){
        
    }
    getAll(){
        let db = monk(url);
        let networks = db.get('networks');
        return networks.find({}).then((results)=>{
            console.log("Get all");
            //console.log(results);
        }).catch((err)=>{
            console.error(err);
        }).then(()=>{
            db.close();
        });
    }
    insert(){
        let db = monk(url);
        let networks = db.get('networks');
        return networks.insert(this)
        .then((results)=>{
            super._id = results._id;
            console.log("Insertado: "+super._id);
            //console.log(results);
        }).catch((err)=>{
            console.error(err);
        }).then(()=>{
            db.close();
        });
    }
    update(){

    }
    save(){

    }
}

let test = new Network();
console.log(test);
test.insert().then(()=>{
    return test.getAll()
}).then(()=>{
    console.log(test.id)
});
//test.getAll();
//console.log(test);*/