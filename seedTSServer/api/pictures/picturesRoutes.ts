import e = require("express");
import formidable = require("formidable");
import fs = require("fs-extra");
import $ = require("../../services/mtg");
import path = require("path");

var moduleName = "uploadRoutes@";

export function uploadPicture(expReq: e.xRequest<e.IRouteParamId>, expRes: e.Response, next) {

    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';

    form.parse(expReq, function (err, fields: formidable.Fields, files: formidable.Files) {
        var sourceFile = files.file.path;
        var destinationFile = path.join($.server.picturesPath, files.file.name);
        $.log.info(destinationFile + " <= " + sourceFile );

        fs.exists(destinationFile,(isFileExisting: boolean) => {
            if (isFileExisting) {
                expRes
                    .status(406)
                    .header({ 'content-type': 'application/json' })
                    .send({ error: true, errorMsg: "File already exists. Delete first!" });
            } else {
                fs.rename(sourceFile, destinationFile);
                expRes
                    .status(200)
                    .header({ 'content-type': 'application/json' })
                    .send({ fields: fields, files: files });
            }
        });
    });
}

export function getAllPictures(expReq: e.xRequest<e.IRouteParamId>, expRes: e.Response, next) {
    fs.readdir($.server.picturesPath,(err: Error, files: string[]) => {
        if (!err) {
            expRes
                .status(200)
                .header({ 'content-type': 'application/json' })
                .send({ files: files });

        } else {
            expRes
                .status(500)
                .header({ 'content-type': 'application/json' })
                .send({ error: err});
        }
    })
}

export function deletePicture(expReq: e.xRequest<e.IRouteParamId>, expRes: e.Response, next) {
    var fileNameToDel: string;
    $.log.error("Not implemented yet");
    //fs.remove(fileNameToDel,(err: Error) => {
    //    if (!err) {
    //        expRes
    //            .status(200)
    //            .header({ 'content-type': 'application/json' })
    //            .send({ file: fileNameToDel });
    //    } else {
    //        expRes
    //            .status(500)
    //            .header({ 'content-type': 'application/json' })
    //            .send({ error: err });
    //    }
    //});
}
