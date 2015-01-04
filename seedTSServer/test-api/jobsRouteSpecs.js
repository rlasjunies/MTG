//should.not.exist(err);
//res.should.have.status(200);
//should.exist(res.headers['set-cookie']);
//should.not.exist(res.headers['set-cookie']);
//res.text.should.include('dashboard');
//res.redirects.should.eql([]);
//res.header.location.should.equal('/dashboard');
//should.exist(res.headers['set-cookie']);
//should.not.exist(res.headers['set-cookie']);
//resp.redirects.should.eql(['http://localhost:4000/simple']);
var chai = require("chai");
var request = require("supertest");
var express = require("express");
var xDBLib = require("../services/db");
var xConfig = require("../services/config");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());
var expect = chai.expect;
var xJobsRoutes = require('../api/jobs/jobsRoutes');
xJobsRoutes.routes(app);
describe("jobs", function () {
    before(function (done) {
        xDBLib.connectDB(xConfig.MONGOLAB_CONNECT_STRING).then(done);
    });
    describe("/api/jobs-GET", function () {
        it("should return records and should be job records", function (done) {
            request(app).post("/auth/login").send("{ email: 'test@g.c', password: '1234' }").end(function (err, res) {
                request(app).get('/api/jobs').send("").expect('Content-Type', /json/).end(function (err, resp) {
                    expect(err).equals(null);
                    expect(resp.status).equals(200); //res.should.have.status(200);
                    //console.log("respJob.body:" + JSON.stringify(resp.body));
                    var doc = resp.body;
                    expect(doc).to.be.a('Array');
                    expect(doc.length).to.not.equal(0);
                    expect(doc[0].title).to.exist;
                    expect(doc[0].description).to.exist;
                    done();
                });
            });
        });
    });
    describe("/api/jobs-POST", function () {
        it("should validate that title is greater than 4 characters");
        it("should validate that title is less than 40 characters");
        it("should validate that description is greater than 4 characters");
        it("should validate that description is less than 250 characters");
        it("should pass the job to the database save", function (done) {
            //var dataSavedJob: xJobsModel.IJobDocument;
            var newJob = { title: 'Cook', description: 'Chef required' };
            request(app).post('/api/jobs').send(newJob).end(function (err, resp) {
                expect(err).equals(null);
                expect(resp.status).equals(200); //res.should.have.status(200);
                //console.log("respJob.body:" + JSON.stringify(resp.body));
                var doc = resp.body;
                expect(doc._id).to.not.be.empty;
                expect(doc.__v).to.equal(0);
                //remove added properties from mongodb
                delete doc._id;
                delete doc.__v;
                expect(doc).to.deep.equal(newJob);
                done();
            });
        });
        it("should return a status 200 to the front end if the database saved");
        it("should return a job with an id");
        it("should return an error if the database failed");
    });
    after(function (done) {
        xDBLib.disConnectDB().then(done);
    });
});
//# sourceMappingURL=jobsRouteSpecs.js.map