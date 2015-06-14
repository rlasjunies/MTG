var $ = require("../services/mtg");
var fs = require("fs-extra");
var moduleName = "authorizationService@";
function checksRole(roles) {
    return function (req, res, next) {
        var allowed = false;
        for (var _i = 0; _i < roles.length; _i++) {
            var role = roles[_i];
            if (req.user.allowedRoles.indexOf(role) !== -1) {
                allowed = true;
            }
        }
        if (!allowed) {
            var msg = "Not allowed; Missing role:" + roles.concat(",");
            $.log.info(msg);
            res.status(403).send({ message: msg });
        }
        else {
            next();
        }
    };
}
exports.checksRole = checksRole;
function checksAccessRight(accessRight) {
    return function (req, res, next) {
        var allowed = false;
        loadAccessRightFromRoles(req.user.allowedRoles, function (accessRights) {
            $.log.info("accessRights:" + JSON.stringify(accessRights));
            $.log.info(("accessRights.indexOf(" + accessRight + "):") + accessRights.indexOf(accessRight));
            if (accessRights.indexOf(accessRight) !== -1) {
                allowed = true;
            }
            if (!allowed) {
                var msg = "Not allowed; Missing accessRight:" + accessRight;
                $.log.warn(msg);
                res.status(403).send({ message: msg });
            }
            else {
                next();
            }
        });
    };
}
exports.checksAccessRight = checksAccessRight;
function loadAccessRightFromRoles(userRoles, callback) {
    fs.exists($.server.rolesFileName, function (isFileExisting) {
        if (!isFileExisting) {
            callback([]);
        }
        else {
            fs.readFile($.server.rolesFileName, "utf8", function (err, data) {
                if (err) {
                    callback([]);
                }
                else {
                    var accessRights = [];
                    var fileRoles = JSON.parse(data.slice(1));
                    for (var _i = 0; _i < userRoles.length; _i++) {
                        var userRole = userRoles[_i];
                        var fileRole = void 0;
                        $.log.debug("userrole:" + userRole);
                        for (var _a = 0; _a < fileRoles.length; _a++) {
                            var tmpFileRole = fileRoles[_a];
                            if (tmpFileRole.id == userRole) {
                                fileRole = tmpFileRole;
                            }
                        }
                        if (fileRole) {
                            accessRights = accessRights.concat(fileRole.accessrights);
                        }
                        else {
                            $.log.error("Unknown role:" + userRole);
                        }
                    }
                    $.log.info("accessright: " + accessRights.toString() + " \n allowed for:" + userRoles);
                    callback(accessRights);
                }
            });
        }
    });
}
//# sourceMappingURL=authorization.middleware.js.map