import e = require("express");
import $ = require("../../services/mtg");
import fs = require("fs-extra");
import $usersModel = require("../../models/user");

var moduleName = "authorizationService@";

export function hasRole(role:string) {
    return function (req:e.Request, res:e.Response, next) {
        if (req.user.allowedRoles.indexOf(role) !== -1 ? false : true) {
            var msg = "Not allowed; Missing role:" + role;
            $.log.info(msg);
            res.status(403).send({ message: msg });
        } else {
            next();
        }
    }
}
