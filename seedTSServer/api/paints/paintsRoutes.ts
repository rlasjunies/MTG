import e = require("express");

//import jwt = require("jwt-simple");
import $log = require("../../services/logger");

import $paintsCol = require("../../models/paints");
//import $ConfigSecret = require("../../services/configSecret");

var moduleName = "paintsRoutes@";

//Create
export function create(expReq: e.xRequest<e.IRouteParamId>, expRes: e.Response, next) {
    $log.profile(moduleName + "@create");
    //$log.debug(moduleName + "@create\n" + expReq.body);

    var paint = $paintsCol.paintModel();
    var newPaint = new paint(expReq.body);
    newPaint.validate(function (err: any) {
        newPaint.save<$paintsCol.IPaintDocument>((err, paint) => {
            if (err) { return expRes.status(500).write({ message: "Error writing job!" }); }

            $log.debug(moduleName + "@create:\n" + paint);
            $log.profile(moduleName + "@create");
            return expRes.status(200).send(paint);
        });
    });
};

//find
export function find(expReq: e.xRequest<e.IRouteParamId>, expRes: e.Response, next) {
    $log.profile(moduleName + "@find");

    var paints: $paintsCol.IPaintModel = $paintsCol.paintModel();

    var qry = {};
    if (expReq.params.id) {
        qry = { _id: expReq.params.id };
    }

    paints.find(qry, (err, paint) => {
        if (err) {
            return expRes.status(500).write({ message: "Error getting jobs!" });
        }

        $log.debug("expReq.params.id:" + expReq.params.id);
        $log.profile(moduleName + "@find");
        expRes.status(200).send(paint);
    });
};

//remove
export function remove(expReq: e.xRequest<e.IRouteParamId>, expRes: e.Response, next) {
    $log.profile(moduleName + "@remove");
    var mdlPaints: $paintsCol.IPaintModel = $paintsCol.paintModel();

    if (!expReq.params.id) {
        throw new Error("ID parameter is required!");
    }

    mdlPaints.findByIdAndRemove(expReq.params.id, (err, paints) => {
        if (err) {
            return expRes.status(500).write({ message: "Error getting paints!" });
        }

        $log.profile(moduleName + "@remove");
        expRes.status(200).send(paints);
    });

};

//update
export function update(expReq: e.xRequest<e.IRouteParamId>, expRes: e.Response, next) {
    $log.profile(moduleName + "@update");
    var mdlPaints: $paintsCol.IPaintModel = $paintsCol.paintModel();
    var paint = $paintsCol.paintModel();
    var newPaint = new paint(expReq.body);

    if (!expReq.params.id) {
        throw new Error("Is parameter is required!");
    }

    mdlPaints.findByIdAndUpdate(expReq.params.id, newPaint, (err, paints) => {
        if (err) {
            return expRes.status(500).write({ message: "Error updating paint!" });
        }

        $log.profile(moduleName + "@update");
        expRes.status(200).send(paints);
    });
};

