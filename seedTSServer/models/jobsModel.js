var mongoose = require("mongoose");
var Promise = require("bluebird");
var jobSchema = new mongoose.Schema();
jobSchema.add({
    title: { type: String },
    description: { type: String }
});
function jobModel() {
    return mongoose.model("job", jobSchema);
}
exports.jobModel = jobModel;
function findJobs(query) {
    return Promise.cast(jobModel().find(query).exec());
}
exports.findJobs = findJobs;
exports.createJob = Promise.promisify(jobModel().create, jobModel());
//# sourceMappingURL=jobsModel.js.map