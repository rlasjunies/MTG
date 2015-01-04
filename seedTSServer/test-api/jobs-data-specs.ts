import chai = require("chai");
import xDbLib = require('../services/db');
import xConfig = require('../services/config');
import jobsModelLib = require('../models/jobsModel');
import jobsDataLib = require('../api/jobs/jobsData');

import Promise = require('bluebird');
import mongoose = require('mongoose');

var expect = chai.expect;


describe("get jobs", function () {

    var jobs: jobsModelLib.IJobDocument[];

    before((done) => {
        xDbLib.connectDB(xConfig.MONGOLAB_CONNECT_STRING)
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
