import chai = require("chai");
import xDbLib = require("../services/db");
// import xConfig = require("../services/config");
import jobsModelLib = require("../models/jobsModel");
import jobsDataLib = require("../api/jobs/jobsData");
import $Config = require("../services/config");
import $ConfigSecret = require("../services/configSecret");

// import Promise = require("bluebird");
// import mongoose = require("mongoose");

var expect = chai.expect;
process.env.NODE_ENV = process.env.NODE_ENV || "development";

describe("get jobs", function () {

    var jobs: jobsModelLib.IJobDocument[];

    before((done) => {
        console.log("process.env:" + process.env);
        console.log("$Config.dbConnectString[process.env]" + $Config.dbConnectString[process.env]);
        console.log("$Config.dbConnectString[process.env].replace('XXXXXX', $ConfigSecret.db[process.env]):"
            + $Config.dbConnectString[process.env].replace("XXXXXX", $ConfigSecret.db[process.env]));
        xDbLib.connectDB($Config.dbConnectString[process.env.NODE_ENV].replace("XXXXXX", $ConfigSecret.db[process.env.NODE_ENV]))
            .then(jobsDataLib.resetJobs)
            .then(jobsDataLib.populate)
            .then(jobsModelLib.findJobs)
            .then(function (collection) {
                jobs = collection;
                done();
            });
    });

    it("should never be empty since jobs are seeded", function (done) {
        expect(jobs.length).to.be.at.least(1);
        done();
    });

    it("title should not be empty", function (done) {
        expect(jobs[0].title).to.be.not.empty;
        done();
    });

    it("decription should not be empty", function (done) {
        expect(jobs[0].description).to.be.not.empty;
        done();
    });

    after((done) => {
        xDbLib.disConnectDB()
            .then(done);
    });

});
