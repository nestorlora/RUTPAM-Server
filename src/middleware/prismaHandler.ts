/**
 * @file
 * @version v1.0.0
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2021
 * @license MIT
 */

import { Response, Request } from 'express'
//import { Prisma } from '@prisma/client'
import { sendError } from '../helpers/sendError'

/*export function prismaHandler(err:any, req:Request, res:Response, next?:Function) {
    if(err instanceof Prisma.PrismaClientKnownRequestError){
        const e:Prisma.PrismaClientKnownRequestError = err;
        switch(e.code){
        case 'P2002':
            sendError(res, 409, msgP2002(e));
        }
    }else{
        sendError(res, 500);
    }
}

function msgP2002(error:Prisma.PrismaClientKnownRequestError){
    const meta:{target:string[]} = error.meta as any;
    let msg:string = 'Unique parameter already exists: ';
    msg += meta.target.join();
    return msg;
}*/