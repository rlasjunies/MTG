var mongoose = require("mongoose");
var Promise = require("bluebird");
var $Config = require("./config");
var $ConfigSecret = require("./configSecret");
var $log = require("./logger");
exports.connectDB = Promise.promisify(mongoose.connect, mongoose);
function connect() {
    $log.debug("process.env:" + process.env.NODE_ENV);
    $log.debug("$Config.dbConnectString[process.env]" + $Config.dbConnectString[process.env.NODE_ENV]);
    $log.debug("$Config.dbConnectString[process.env].replace('XXXXXX', $ConfigSecret.db[process.env.NODE_ENV]):" + $Config.dbConnectString[process.env.NODE_ENV].replace("XXXXXX", $ConfigSecret.db[process.env]));
    exports.connectDB($Config.dbConnectString[process.env.NODE_ENV].replace("XXXXXX", $ConfigSecret.db[process.env.NODE_ENV])).then(function () {
        $log.info("Connected to DB!");
    });
}
exports.connect = connect;
exports.disConnectDB = Promise.promisify(mongoose.disconnect, mongoose);
//# sourceMappingURL=db.js.map