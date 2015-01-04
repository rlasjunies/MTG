var chai = require("chai");
var xDbLib = require('../services/db');
var xConfig = require('../services/config');
var jobsModelLib = require('../models/jobsModel');
var jobsDataLib = require('../api/jobs/jobsData');
var expect = chai.expect;
describe("get jobs", function () {
    var jobs;
    before(function (done) {
        xDbLib.connectDB(xConfig.MONGOLAB_CONNECT_STRING).then(jobsDataLib.resetJobs).then(jobsDataLib.populate).then(jobsModelLib.findJobs).then(function (collection) {
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
    after(function (done) {
        xDbLib.disConnectDB().then(done);
    });
});
//# sourceMappingURL=jobs-data-specs.js.map