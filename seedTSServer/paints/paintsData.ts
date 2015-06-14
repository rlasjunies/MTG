// import mongoose = require("mongoose");
// import Promise = require("bluebird");
// import $paintModel = require("../models/paints");
// 
// export function resetPaints() {
//     return new Promise((resolve, reject) => {
//         mongoose.connection.collection("paints").drop(resolve, reject);
//     });
// }
// 
// var paintsArray = [
//     { title: "2012121", description: "description 1" },
//     { title: "20141212", description: "description 2" },
//     { title: "no title", description: "description 3" }
// ];
//  
// export function populate() {
// 
//     return $paintModel.findPaints({}).then((paints) => {
//         if (paints.length === 0) {
// 
//             return Promise.map(paintsArray, (paint) => {
//                 return $paintModel.createJob(paint);
//             });
//         }
//     });
// }
