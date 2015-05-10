//import mongoose = require("mongoose");
//import Promise = require("bluebird");
//import $Config = require("./config");
//import $ConfigSecret = require("./configSecret");
import $log = require("./logger");
import $NeDBDataStore = require("nedb");

export var db = new $NeDBDataStore({ filename: '', autoload: true });

//export var disConnectDB = Promise.promisify(mongoose.disconnect, mongoose);
