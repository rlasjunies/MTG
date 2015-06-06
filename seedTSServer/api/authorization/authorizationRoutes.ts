import e = require("express");
import fs = require("fs-extra");
import $ = require("../../services/mtg");
import path = require("path");

var moduleName = "authorizationRoutes@";

export function getAllRoles(expReq: e.xRequest<e.IRouteParamId>, expRes: e.Response, next) {
    //TODO refactor the code to provide a generic file function
    var sourceFile = $.server.rolesFileName;
    $.log.info("read roles file:" + sourceFile);

    fs.exists(sourceFile,(isFileExisting: boolean) => {
        if (!isFileExisting) {
            expRes
                .status(406)
                .header({ 'content-type': 'application/json' })
                .send({ error: true, errorMsg: "Roles File is missing" });
        } else {
            fs.readFile(sourceFile, "utf8",(err: Error, data) => {
                if (err) {
                    expRes.status(500)
                        .header({ 'content-type': 'application/json' })
                        .send({ error: true, errorMsg: "Error Reading Access right files" });
                } else {
                    expRes
                        .status(200)
                        .header({ 'content-type': 'application/json' })
                    //.send({ "prop": "value" });
                        .send(data);
                }
            });
        }
    });
}