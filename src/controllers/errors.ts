/**
 * @file Error controllers file
 * @version v2.3.0
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2021
 * @license MIT
 */

import { Response, Request } from 'express'
import { sendError } from '../helpers/sendError.js'

export function notFound(req:Request, res:Response) {
    sendError(res, 404);
}

export function methodNotAllowed(req:Request, res:Response) {
    sendError(res, 405);
    // TODO: Generar cabeceras con los métodos soportados para el recurso
    // Implementar en routes un fichero por cada módulo. Exportar del fichero una cadena con los métodos permitidos y utilizarla desde aquí en función de la petición efectuada
}

export function tooManyRequests(req:Request, res:Response) {
    sendError(res, 429);
    // TODO: Set timeout in response
}

export function notImplemented(req:Request, res:Response) {
    sendError(res, 501);
}