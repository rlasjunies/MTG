import e = require("express");
import jwt = require("jwt-simple"); 
import moment = require("moment");

import $Token = require("./token");
import $EmailVerification = require("./emailVerification");
import $log = require("../services/logger");
import $configSecret = require("../services/configSecret");

var moduleName = "localAuth";

export function register(expReq: e.Request, expRes: e.Response, info) {
    $EmailVerification.send(expReq.body.email, expRes);
    $Token.createSendToken(expReq.user, expRes);
}

export function login (expReq: e.Request, expRes: e.Response, info) {
    $Token.createSendToken(expReq.user, expRes);
}

export function authenticationCheck(expReq: e.Request, expRes: e.Response, next) {
    if (!expReq.headers["authorization"]) {
        return expRes.status(401).send({ message: "you are not authorized!" });
    } else {
        $log.debug(moduleName + "@authentication: req.headers['authorization']" + expReq.headers["authorization"]);
        var authorization = expReq.headers["authorization"];
        var token = authorization.split(" ")[1];
        try {
            var payload = jwt.decode(token, $configSecret.JWT_SECRET);
        }catch(e){
            payload = {};
        }
        if (!payload.sub) {
            return expRes.status(401).send({ message: "Authentication failed" });
        } else {
            if (moment.unix(payload.exp).diff(moment(), 'second') < 0){
                console.log("!!!!token expired!!!");
            }

            next();
        }
    }
}