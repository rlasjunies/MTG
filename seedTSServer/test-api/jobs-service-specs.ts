import chai = require("chai");
import Promise = require('bluebird');
import mongoose = require('mongoose');

//import xDb = require('../webapi/services/db');
//import xConfig = require('../webapi/services/config');
//import xJob = require('../webapi/models/job');


////import mocha = require('mocha');
////import xJob = require('../webapi/models/job');
//describe("jobs services check - save", () => {
//    it("should validate that title is greater than 4 characters");
//    it("should validate that title is less than 40 characters");
//    it("should validate that description is greater than 4 characters");
//    it("should validate that description is less than 250 characters");

//    var dataSavedJob:xJob.IJobDocument;
//    var newJob = { title: 'Cook', description: 'Chef required' };

//    it("should pass the job to the database save", (done) => {
//        expect(dataSavedJob).to.deep.equal(newJob);
//        done();
//    });
//    it("should return a status 200 to the front end if the database saved");
//    it("should return a job with an id");
//    it("should return an error if the database failed");

//});