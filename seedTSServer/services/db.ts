import mongoose = require("mongoose");
import Promise = require("bluebird");
import $Config = require("./config");
import $ConfigSecret = require("./configSecret");
import $log = require("./logger");

export interface IDb {
    test(): void;
}
export var connectDB = Promise.promisify(mongoose.connect, mongoose);

export function connect() {
    $log.debug("process.env:" + process.env.NODE_ENV);
    $log.debug("$Config.dbConnectString[process.env]" + $Config.dbConnectString[process.env.NODE_ENV]);
    $log.debug("$Config.dbConnectString[process.env].replace('XXXXXX', $ConfigSecret.db[process.env.NODE_ENV]):"
        + $Config.dbConnectString[process.env.NODE_ENV].replace("XXXXXX", $ConfigSecret.db[process.env]));

    let stringConnect:string = $Config.dbConnectString[process.env.NODE_ENV].replace("XXXXXX", $ConfigSecret.db[process.env.NODE_ENV]);
    connectDB(stringConnect,{})
        .then(() => {
            $log.debug("Connected to DB!");
        });
}

export var disConnectDB = Promise.promisify(mongoose.disconnect, mongoose);
