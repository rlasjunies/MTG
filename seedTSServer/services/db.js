var mongoose = require("mongoose");
// import jobModel = require("../jobs/jobsModel");
var Promise = require("bluebird");
var xConfig = require("./config");
exports.connectDB = Promise.promisify(mongoose.connect, mongoose);
function connect() {
    exports.connectDB(xConfig.MONGOLAB_CONNECT_STRING).then(function () {
        console.log("Connected to DB!");
    });
}
exports.connect = connect;
// export function disConnect() : Function {
//    return Promise.promisify(mongoose.disconnect, mongoose);
// }
exports.disConnectDB = Promise.promisify(mongoose.disconnect, mongoose);
//# sourceMappingURL=db.js.map