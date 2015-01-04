import mongoose = require("mongoose");
import Promise = require("bluebird");
import xJobsModel = require("../../models/jobsModel");

export function resetJobs() {
    return new Promise((resolve, reject) => {
        mongoose.connection.collection("jobs").drop(resolve, reject);
    });
}

var jobsArray = [
    { title: "Cook", description: "Chef required" },
    { title: "programmer", description: "Super programmer required" },
    { title: "Project manager", description: "Super project manager required" }
];

export function populate() {

    return xJobsModel.findJobs({}).then((jobCollection) => {
        if (jobCollection.length === 0) {

            return Promise.map(jobsArray, (job) => {
                return xJobsModel.createJob(job);
            });
        }
    });
}
