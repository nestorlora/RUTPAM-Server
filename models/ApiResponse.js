/**
 * @file Class ApiResponse definition
 * @version v1.0
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2019
 * @license MIT
 */

class ApiResponse {
    constructor(code, error){
        this.code = code;
        if(error){
            this.status = error;
        }else{
            switch(code){
                default:
                    this.code = 500;
                    this.status = "Internal Server Error";
                    break;
                case 200:
                    this.status = "OK";
                    break;
                /*case 201:
                    this.status = "Created";
                    break;
                case 202:
                    this.status = "Accepted";
                    break;
                case 204:
                    this.status = "No Content";
                    break;*/
                case 400:
                    this.status = "Bad Request";
                    break;
                case 401:
                    this.status = "Unauthorized";
                    break;
                case 403:
                    this.status = "Forbidden";
                    break;
                case 404:
                    this.status = "Not Found";
                    break;
                /*case 410:
                    this.status = "Gone";
                    break;
                case 423:
                    this.status = "Locked";
                    break;*/
                case 429:
                    this.status = "Too Many Requests";
                    break;
                case 500:
                    this.status = "Internal Server Error";
                    break;
                case 501:
                    this.status = "Not Implemented";
                    break;
                case 503:
                    this.status = "Service Unavailable";
                    break;
            }
        }
        return this;   
    }

    send(data, res){
        if(data === null){
            data = {};
        }
        if(res){
            res.status(this.code).json(Object.assign(this, data)).end();
        }else{
            return Object.assign(this, data);
        }
    }

}

module.exports = {ApiResponse};
