/**
 * @file Controller functions for /info
 * @version v1
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2022
 * @license MIT
 */

import { Response, Request } from 'express'

export class InfoController{
    getInfo(req:Request, res:Response){
        let info = {
            "version": req.app.get('version'),
            "contact": req.app.get('contact'),
            "web": req.app.get('web'),
            "maintenance": req.app.get('maintenance')
        };
        res.status(200);
        res.json(info);
    }
}

