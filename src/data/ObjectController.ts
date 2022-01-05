/**
 * @file Generic controller definition
 * @version v1.0.0
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2021
 * @license MIT
 */

import { Response, Request } from 'express'
import { sendError } from '../helpers/sendError.js'
import { err as errorHandler } from '../middleware/errorHandler.js'

/**
 * @abstract
 * @class ObjectController
 * Abstract controller with CRUD methods and aux functions
 */
export abstract class ObjectController {
    sendResponse(res:Response, code:number, data?:Object){
        res.status(code);
        res.json(data);
    }

    sendError(res:Response, code:number, err?:string){
        sendError(res, code, err);
    }

    exceptionHandler(err:any, req:Request, res:Response, next?:Function){
        errorHandler(err, req, res, next);
    }

    abstract findUnique(req:Request, res:Response): Promise<void>;
    
    abstract findOne(req:Request, res:Response): Promise<void>;

    abstract findMany(req:Request, res:Response): Promise<void>;

    abstract createOne(req:Request, res:Response): Promise<void>;

    //future abstract createMany(req:Request, res:Response): Promise<void>;

    abstract updateOne(req:Request, res:Response): Promise<void>;

    //future abstract updateMany(req:Request, res:Response): Promise<void>;

    abstract deleteOne(req:Request, res:Response): Promise<void>;

    abstract deleteMany?(req:Request, res:Response): Promise<void>;

    abstract options(req:Request, res:Response): Promise<void>;
}