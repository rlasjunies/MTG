var $log = require("../services/logger");
var $paintsModel = require("../models/paints");
var moduleName = "paintsRoutes@";
function create(expReq, expRes, next) {
    $log.profile(moduleName + "@create");
    var paintModel = $paintsModel.paintModel();
    var newPaint = new paintModel(expReq.body);
    newPaint.validate(function (err) {
        newPaint.save(function (err, paint) {
            if (err) {
                return expRes.status(500).write({ message: "Error writing job!" });
            }
            $log.debug(moduleName + "@create:\n" + paint);
            $log.profile(moduleName + "@create");
            return expRes.status(200).send(paint);
        });
    });
}
exports.create = create;
;
function find(expReq, expRes, next) {
    $log.profile(moduleName + "@find");
    var paints = $paintsModel.paintModel();
    var qry = {};
    if (expReq.params.id) {
        qry = { _id: expReq.params.id };
    }
    paints.find(qry, function (err, paint) {
        if (err) {
            return expRes.status(500).write({ message: "Error getting jobs!" });
        }
        $log.debug("expReq.params.id:" + expReq.params.id);
        $log.profile(moduleName + "@find");
        expRes.status(200).send(paint);
    });
}
exports.find = find;
;
function remove(expReq, expRes, next) {
    $log.profile(moduleName + "@remove");
    var mdlPaints = $paintsModel.paintModel();
    if (!expReq.params.id) {
        throw new Error("ID parameter is required!");
    }
    mdlPaints.findByIdAndRemove(expReq.params.id, function (err, paints) {
        if (err) {
            return expRes.status(500).write({ message: "Error getting paints!" });
        }
        $log.profile(moduleName + "@remove");
        expRes.status(200).send(paints);
    });
}
exports.remove = remove;
;
function update(expReq, expRes, next) {
    $log.profile(moduleName + "@update");
    var mdlPaints = $paintsModel.paintModel();
    var paint = $paintsModel.paintModel();
    var newPaint = new paint(expReq.body);
    if (!expReq.params.id) {
        throw new Error("Is parameter is required!");
    }
    mdlPaints.findByIdAndUpdate(expReq.params.id, newPaint, function (err, paints) {
        if (err) {
            return expRes.status(500).write({ message: "Error updating paint!" });
        }
        $log.profile(moduleName + "@update");
        expRes.status(200).send(paints);
    });
}
exports.update = update;
;
//# sourceMappingURL=paintsRoutes.js.map