import mongoose = require("mongoose");
import Promise = require("bluebird");

export interface IPaintModel extends mongoose.Model<IPaintDocument> {
}

export interface IPaintSchema extends mongoose.Schema {
    methods: any; // used to extend the toJSON function
}

export interface IPaintObject {
    title: string;
    description: string;
}

export interface IPaintDocument extends IPaintObject, mongoose.Document {
}

var paintSchema: IPaintSchema = <IPaintSchema> new mongoose.Schema();
paintSchema.add({
    title: { type: String },
    description: { type: String },
    year: { type: String },
    picture: { type: String },
    order: { type: Number },
    size: { type: String },
    thumbnail: { Type: String }
});

export function paintModel(): IPaintModel {
    return <IPaintModel>mongoose.model<IPaintDocument>("paint", paintSchema);
}

export function findPaints(query) {
    return Promise.cast(paintModel().find(query).exec());
}

export var createJob = Promise.promisify(paintModel().create, paintModel());
