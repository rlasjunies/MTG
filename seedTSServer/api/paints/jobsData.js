var mongoose = require("mongoose");
var Promise = require("bluebird");
var xJobsModel = require("../../models/jobsModel");
function resetJobs() {
    return new Promise(function (resolve, reject) {
        mongoose.connection.collection("jobs").drop(resolve, reject);
    });
}
exports.resetJobs = resetJobs;
var jobsArray = [
    { title: "Cook", description: "Chef required" },
    { title: "programmer", description: "Super programmer required" },
    { title: "Project manager", description: "Super project manager required" }
];
function populate() {
    return xJobsModel.findJobs({}).then(function (jobCollection) {
        if (jobCollection.length === 0) {
            return Promise.map(jobsArray, function (job) {
                return xJobsModel.createJob(job);
            });
        }
    });
}
exports.populate = populate;
//# sourceMappingURL=jobsData.js.map