var chai = require("chai");
var xDbLib = require("../services/db");
// import xConfig = require("../services/config");
var jobsModelLib = require("../models/jobsModel");
var jobsDataLib = require("../api/jobs/jobsData");
var $Config = require("../services/config");
var $ConfigSecret = require("../services/configSecret");
var $log = require("../services/logger");
$log.setLevels(1);
var expect = chai.expect;
process.env.NODE_ENV = process.env.NODE_ENV || "development";
describe("get jobs", function () {
    var jobs;
    before(function (done) {
        $log.debug("process.env:" + process.env.NODE_ENV);
        $log.debug("$Config.dbConnectString[process.env.NODE_ENV]" + $Config.dbConnectString[process.env.NODE_ENV]);
        $log.debug("$Config.dbConnectString[process.env.NODE_ENV].replace('XXXXXX', $ConfigSecret.db[process.env.NODE_ENV]):" + $Config.dbConnectString[process.env.NODE_ENV].replace("XXXXXX", $ConfigSecret.db[process.env.NODE_ENV]));
        xDbLib.connectDB($Config.dbConnectString[process.env.NODE_ENV].replace("XXXXXX", $ConfigSecret.db[process.env.NODE_ENV])).then(jobsDataLib.resetJobs).then(jobsDataLib.populate).then(jobsModelLib.findJobs).then(function (collection) {
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