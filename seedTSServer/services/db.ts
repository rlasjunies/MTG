import mongoose = require("mongoose");
// import jobModel = require("../jobs/jobsModel");
import Promise = require("bluebird");
import xConfig = require("./config");

export interface IDb {
    test(): void;
}
export var connectDB = Promise.promisify(mongoose.connect, mongoose);

export function connect() {
    connectDB(xConfig.MONGOLAB_CONNECT_STRING)
        .then(() => {
            console.log("Connected to DB!");
        });
}

// export function disConnect() : Function {
//    return Promise.promisify(mongoose.disconnect, mongoose);
// }

export var disConnectDB = Promise.promisify(mongoose.disconnect, mongoose);

// export class db {
//    constructor(dbName:string){
//        mongoose.connect(""+dbName, (err) => {
//            if (err) {
//                throw err;
//            }
//            console.log("mongodb connected!");
//            jobModel.populate();
//                //.then(() => {
//                //    console.log("populating finished!");
//                //})
//                //.catch((err) => {
//                //    console.log("populating error!");
//                //});
//        });
//    }

//    public disconnect() {
//        mongoose.disconnect();
//    }
// }
