var mongoose = require("mongoose");
var Promise = require("bluebird");
var $paintModel = require("../../models/paints");
function resetPaints() {
    return new Promise(function (resolve, reject) {
        mongoose.connection.collection("paints").drop(resolve, reject);
    });
}
exports.resetPaints = resetPaints;
var paintsArray = [
    { title: "2012121", description: "description 1" },
    { title: "20141212", description: "description 2" },
    { title: "no title", description: "description 3" }
];
function populate() {
    return $paintModel.findPaints({}).then(function (paints) {
        if (paints.length === 0) {
            return Promise.map(paintsArray, function (paint) {
                return $paintModel.createJob(paint);
            });
        }
    });
}
exports.populate = populate;
//# sourceMappingURL=paintsData.js.map