/**
 * @file
 * @version v1.0.0
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2021
 * @license MIT
 */

import { Response } from 'express'
import { ApiResponse } from '../data/ApiResponse.js'

export function sendError(res:Response, code:number, err?:string) {
    const data:ApiResponse = new ApiResponse(code, err);
    res.status(code);
    res.json(data);
}