/**
 * @file App main router
 * @version v1.11.0
 * @author Néstor Manuel Lora Romero <nestorlora@geeklab.es>
 * @copyright Geeklab - Néstor Manuel Lora Romero 2018-2021
 * @license MIT
 */

import { Application } from "express";
import {InfoController} from '../controllers/info';
//import { NetworkController } from '../controllers/networks'
import * as errors from "../controllers/errors"

export default function(app:Application) {

    app.route('/info').get(new InfoController().getInfo);
/*    app.route('/networks')
        .get(new NetworkController().findMany)
        .post(new NetworkController().createOne)
        .put(errors.methodNotAllowed)
        .patch(errors.methodNotAllowed)
        .delete(errors.methodNotAllowed)
        .options(new NetworkController().options);
    app.route('/networks/:id')
        .get(new NetworkController().findUnique)
        .post(errors.methodNotAllowed)
        .put(new NetworkController().updateOne)
        .patch(errors.methodNotAllowed)
        .delete(new NetworkController().deleteOne)
        .options(new NetworkController().options);
    
    // TODO Define what happens with '/'
    app.route('/*')
        .get(errors.notFound)
        .post(errors.notFound)
        .put(errors.notFound)
        .patch(errors.notFound)
        .delete(errors.notFound)
        .head(errors.notFound);*/
}