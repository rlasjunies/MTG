var fs = require("fs-extra");
var $ = require("../services/mtg");
var moduleName = "authorizationRoutes@";
function getAllRoles(expReq, expRes, next) {
    var sourceFile = $.server.rolesFileName;
    $.log.info("read roles file:" + sourceFile);
    fs.exists(sourceFile, function (isFileExisting) {
        if (!isFileExisting) {
            expRes
                .status(406)
                .header({ 'content-type': 'application/json' })
                .send({ error: true, errorMsg: "Roles File is missing" });
        }
        else {
            fs.readFile(sourceFile, "utf8", function (err, data) {
                if (err) {
                    expRes.status(500)
                        .header({ 'content-type': 'application/json' })
                        .send({ error: true, errorMsg: "Error Reading Access right files" });
                }
                else {
                    expRes
                        .status(200)
                        .header({ 'content-type': 'application/json' })
                        .send(data);
                }
            });
        }
    });
}
exports.getAllRoles = getAllRoles;
//# sourceMappingURL=authorizationRoutes.js.map