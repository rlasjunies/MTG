import express = require("express");
import xToken = require("./token");
import xEmailVerification = require("./emailVerification");

export function register(req: express.Request, res: express.Response) {
    xEmailVerification.send(req.body.email, res);
    xToken.createSendToken(req.user, res);
}

export function login (req: express.Request, res: express.Response) {
    xToken.createSendToken(req.user, res);
}
