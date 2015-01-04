import mongoose = require("mongoose");
import Promise = require("bluebird");

export interface IJobModel extends mongoose.Model<IJobDocument> {
}

export interface IJobSchema extends mongoose.Schema {
    methods: any; // used to extend the toJSON function
}

export interface IJobObject {
    title: string;
    description: string;
}

export interface IJobDocument extends IJobObject, mongoose.Document {
}

var jobSchema: IJobSchema = <IJobSchema> new mongoose.Schema();
jobSchema.add({
    title: { type: String },
    description: { type: String }
});

export function jobModel(): IJobModel {
    return <IJobModel>mongoose.model<IJobDocument>("job", jobSchema);
}

export function findJobs(query) {
    return Promise.cast(jobModel().find(query).exec());
}

export var createJob = Promise.promisify(jobModel().create, jobModel());
