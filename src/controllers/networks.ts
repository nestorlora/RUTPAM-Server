/**
 * @file Controller functions for /networks
 * @version v2.10.0
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2021
 * @license MIT
 */

import { Response, Request } from 'express'
import { Network, PrismaClient } from '@prisma/client'
import { ApiResponse } from '../data/ApiResponse'
import { ObjectController } from '../data/ObjectController'
import { sendError } from '../helpers/sendError'
import { err } from '../middleware/errorHandler'

class NetWorkResponse extends ApiResponse{
    public networks:Network[];

    constructor(code:Number, networks?:Network[]){
        super(code);
        if(networks){
            this.networks = networks;
        }else{
            this.networks = new Array<Network>();
        }
    }
}

export class NetworkController extends ObjectController{
    async findUnique(req:Request, res:Response){
        if(req.params.id){
            const prisma = new PrismaClient();
            const  id:Network["id"] = Number(req.params.id);
            try{
                const result = await prisma.network.findUnique({
                    where: {id: id}
                })
                if(result !== null){
                    const data = new NetWorkResponse(200, [result] as Network[]);
                    sendResponse(res, 200, data);
                }else{
                    sendError(res, 404);
                }
            }
            catch(e){
                err(e,req,res);
            }
        }else{
            // DEVOLVER ERROR 400
        }
    }
    
    async findOne(req:Request, res:Response){
        // TODO Not implemented
        this.sendError(res, 501);
    }

    async findMany(req:Request, res:Response){
        const prisma = new PrismaClient();
        try{
            const networks:Network[] = await prisma.network.findMany()
            const data = new NetWorkResponse(200, networks);
            this.sendResponse(res, 200, data);
        }
        catch(e){
            this.exceptionHandler(e,req,res);
        }
    }

    async createOne(req:Request, res:Response){
        const prisma = new PrismaClient();
        try{
            const received:Network = req.body;
            const created:Network = await prisma.network.create({data: received})
            const data = new NetWorkResponse(201, [created] as Network[]);
            res.location(req.baseUrl+'/networks/'+created.id);
            sendResponse(res, 201, data);
        }
        catch(e){
            err(e,req,res);
        }
    }

    async updateOne(req:Request, res:Response){
        // TODO Not implemented
        this.sendError(res, 501);
    }

    async deleteOne(req:Request, res:Response){
        // TODO Not implemented
        this.sendError(res, 501);
    }

    async options(req:Request, res:Response){
        // TODO Not implemented
        this.sendError(res, 501);
    }

    deleteMany:undefined;
}

function sendResponse(res:Response, code:number, data?:Object){
    res.status(code);
    res.json(data);
}

export async function getAll(req:Request, res:Response){
    const prisma = new PrismaClient();
    try{
        const networks:Network[] = await prisma.network.findMany()
        const data = new NetWorkResponse(200, networks);
        sendResponse(res, 200, data);
    }
    catch(e){
        err(e,req,res);
    }
}

export async function getOne(req:Request, res:Response){
    if(req.params.id){
        const prisma = new PrismaClient();
        const  id:Network["id"] = Number(req.params.id);
        try{
            const result = await prisma.network.findUnique({
                where: {id: id}
            })
            if(result !== null){
                const data = new NetWorkResponse(200, [result] as Network[]);
                sendResponse(res, 200, data);
            }else{
                sendError(res, 404);
            }
        }
        catch(e){
            err(e,req,res);
        }
    }else{
        // DEVOLVER ERROR 400
    }
}

export async function create(req:Request, res:Response){
    const prisma = new PrismaClient();
    try{
        const received:Network = req.body;
        const created:Network = await prisma.network.create({data: received})
        const data = new NetWorkResponse(201, [created] as Network[]);
        res.location(req.baseUrl+'/networks/'+created.id);
        sendResponse(res, 201, data);
    }
    catch(e){
        err(e,req,res);
    }
}
