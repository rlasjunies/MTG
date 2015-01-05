// should.not.exist(err);
// res.should.have.status(200);
// should.exist(res.headers["set-cookie"]);
// should.not.exist(res.headers["set-cookie"]);
// res.text.should.include("dashboard");
// res.redirects.should.eql([]);
// res.header.location.should.equal("/dashboard");
// should.exist(res.headers["set-cookie"]);
// should.not.exist(res.headers["set-cookie"]);
// resp.redirects.should.eql(["http://localhost:4000/simple"]);
var $log = require("../services/logger");
var chai = require("chai");
var sa = require("superagent");
var xDBLib = require("../services/db");
var expect = chai.expect;
// var should = chai.should()
var url = "http://localhost:3000";
// import xJobsRoutes = require("../api/jobs/jobsRoutes");
var agent = sa.agent();
var token;
describe("jobs", function () {
    before(function (done) {
        this.timeout(10000);
        agent.post(url + "/auth/login").send({ email: "test@g.c", password: "1234" }).end(function (err, res) {
            //res.should.have.
            // expect(res.status).to.equals(200);
            // agent.head ["authorization"] = "hjkl";
            $log.debug("................." + res);
            var loginAnswer = JSON.parse(res.text);
            token = loginAnswer.token;
            $log.debug("token:<<<<<<<<<<<<" + token);
            // res.text.should.include("Dashboard");
            // this.timeout(2000);
            // console.log("logged!!!!!!");
            return done();
        });
    });
    // before(function () {
    //    describe("login in the portal", function () {
    //        describe("with good credentials", function () {
    //            it("should create a user session", function () {
    //                this.timeout(10000);
    //                loginUser(agent);
    //            });
    //        });
    //    });
    //    console.log("Token ............." + token);
    // });
    describe("/api/jobs-GET", function () {
        it("should return records and should be job records", function (done) {
            // describe("login in the portal", function () {
            //    describe("with good credentials", function () {
            //        //var agent = sa.agent();
            //        it("should create a user session", loginUser(agent));
            //    });
            // });
            $log.debug("Token:>>>>>>>>>>>>>>>>>>>>>>>>" + token);
            agent.get(url + "/api/jobs").set("authorization", token).send("").end(function (err, resp) {
                $log.debug("Response:" + JSON.stringify(resp));
                expect(err).equals(null);
                expect(resp.status).equals(200); // res.should.have.status(200);
                // console.log("respJob.body:" + JSON.stringify(resp.body));
                var doc = resp.body;
                expect(doc).to.be.a("Array");
                expect(doc.length).to.not.equal(0);
                expect(doc[0].title).to.exist;
                expect(doc[0].description).to.exist;
                done();
            });
        });
    });
    // describe("/api/jobs-POST", () => {
    //    it("should validate that title is greater than 4 characters");
    //    it("should validate that title is less than 40 characters");
    //    it("should validate that description is greater than 4 characters");
    //    it("should validate that description is less than 250 characters");
    //    it("should pass the job to the database save", (done) => {
    //        //var dataSavedJob: xJobsModel.IJobDocument;
    //        var newJob = { title: "Cook", description: "Chef required" };
    //        request(app).post("/api/jobs")
    //            .send(newJob)
    //            .end((err, resp) => {
    //                expect(err).equals(null);
    //                expect(resp.status).equals(200); //res.should.have.status(200);
    //                //console.log("respJob.body:" + JSON.stringify(resp.body));
    //                var doc = <xJobsModel.IJobDocument>resp.body;
    //                expect(doc._id).to.not.be.empty;
    //                expect(doc.__v).to.equal(0);
    //                //remove added properties from mongodb
    //                delete doc._id;
    //                delete doc.__v;
    //                expect(doc).to.deep.equal(newJob);
    //                done();
    //            });
    //    });
    //    it("should return a status 200 to the front end if the database saved");
    //    it("should return a job with an id");
    //    it("should return an error if the database failed");
    // });
    after(function (done) {
        xDBLib.disConnectDB().then(done);
    });
});
//# sourceMappingURL=jobsRoute-specs.js.map