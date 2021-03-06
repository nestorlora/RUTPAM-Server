/**
 * @file ApiResponse class definition
 * @version v1.5.0
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2021
 * @license MIT
 */

export class ApiResponse{
    public code: Number;
    public status: String;

    constructor(code:Number, status?:String){
        this.code = code;
        if(status){
            this.status = status;
        }else{
            switch(code){
                default:
                    this.code = 500;
                    this.status = "Internal Server Error"
                    break;
                case 200:
                    this.status = "OK";
                    break;
                case 201:
                    this.status = "Created";
                    break;
                case 204:
                    this.status = "No Content";
                    break;
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
                case 405:
                    this.status = "Method Not Allowed"
                    break;
                case 409:
                    this.status = "Conflict"
                    break;
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
    }
}