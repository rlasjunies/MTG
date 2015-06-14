var formidable = require("formidable");
var fs = require("fs-extra");
var $ = require("../services/mtg");
var path = require("path");
var moduleName = "uploadRoutes@";
function uploadPicture(expReq, expRes, next) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.parse(expReq, function (err, fields, files) {
        var sourceFile = files[0].path;
        var destinationFile = path.join($.server.picturesPath, files[0].name);
        $.log.info(destinationFile + " <= " + sourceFile);
        fs.exists(destinationFile, function (isFileExisting) {
            if (isFileExisting) {
                expRes
                    .status(406)
                    .header({ 'content-type': 'application/json' })
                    .send({ error: true, errorMsg: "File already exists. Delete first!" });
            }
            else {
                fs.rename(sourceFile, destinationFile);
                expRes
                    .status(200)
                    .header({ 'content-type': 'application/json' })
                    .send({ fields: fields, files: files });
            }
        });
    });
}
exports.uploadPicture = uploadPicture;
function getAllPictures(expReq, expRes, next) {
    fs.readdir($.server.picturesPath, function (err, files) {
        if (!err) {
            expRes
                .status(200)
                .header({ 'content-type': 'application/json' })
                .send({ files: files });
        }
        else {
            expRes
                .status(500)
                .header({ 'content-type': 'application/json' })
                .send({ error: err });
        }
    });
}
exports.getAllPictures = getAllPictures;
function deletePicture(expReq, expRes, next) {
    var fileNameToDel;
    if (!expReq.params.id) {
        throw new Error("Id parameter is required!");
    }
    else {
        fileNameToDel = expReq.params.id;
        fs.remove(path.join($.server.picturesPath, fileNameToDel), function (err) {
            if (!err) {
                expRes
                    .status(200)
                    .header({ 'content-type': 'application/json' })
                    .send({});
            }
            else {
                expRes
                    .status(500)
                    .header({ 'content-type': 'application/json' })
                    .send({ error: err });
            }
        });
    }
}
exports.deletePicture = deletePicture;
//# sourceMappingURL=picturesRoutes.js.map