/**
 * @file
 * @version v1.0.0
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2021
 * @license MIT
 */

import { Response, Request } from 'express'
//import { Prisma } from '@prisma/client'
import { sendError } from '../helpers/sendError.js'
//import { prismaHandler } from './prismaHandler'

export function err(err:any, req:Request, res:Response, next?:Function) {
    sendError(res,500);
}