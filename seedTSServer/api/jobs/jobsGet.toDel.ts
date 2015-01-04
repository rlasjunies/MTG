import jwt = require("jwt-simple");
import express = require("express");

import xConfig = require("../../services/config");

var jobs: any[] = [{ name: "IT eng." },
    { name: "Painter" }, { name: "Assistant" }, { name: "Boucher" }, { name: "Driver" }];

export function getJobs(req: express.Request, res: express.Response) {
    if (!req.headers["authorization"]) {
        return res.status(401).send({ message: "you are not authorized!" });
    } else {

        var token = req.headers["authorization"].split(" ")[1];
        var payload = jwt.decode(token, xConfig.JWT_SECRET );

        if (!payload.sub) {
            return res.status(401).send({ message: "Authentication failed" });
        } else {
            return res.json(jobs);
        }
    }
};
