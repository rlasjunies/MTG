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
var $fmt = require("sprintf");
var $faker = require("faker");
var expect = chai.expect;
var moduleName = "paintsRoute-specs - ";
//Variables used during the test
var siteUrl = "http://localhost:3000";
var user = "test@g.c";
var password = "1234";
var agent = sa.agent();
var token;
var paintsUrl = siteUrl + "/api/paints";
var paintsInitialLenght;
var paintsDocID;
var newPaint = {
    title: $faker.lorem.sentence(),
    description: $faker.lorem.sentences()
};
describe("Paints ", function () {
    before(function (done) {
        this.timeout(10000);
        agent.post(siteUrl + "/auth/login").send({ email: user, password: password }).end(function (err, resp) {
            if (err) {
                $log.error("Error:" + err);
                $log.error($fmt.sprintf("User '%s' NOT logged:", user));
            }
            else {
                $log.debug("res.text:" + resp.text);
                var loginAnswer = JSON.parse(resp.text);
                token = loginAnswer.token;
                $log.info($fmt.sprintf("User '%s' logged:", user));
                return done();
            }
        });
    });
    describe(paintsUrl, function () {
        it("Should get paints", function (done) {
            agent.get(paintsUrl).set("authorization", token).end(function (err, resp) {
                if (err) {
                    $log.error("Error:" + err);
                }
                else {
                    expect(err).equals(null);
                    expect(resp.status).equals(200); // res.should.have.status(200);
                    var paints = resp.body;
                    //var paints = resp.body;
                    $log.debug("resp.body:" + JSON.stringify(resp.body));
                    expect(paints).to.be.a("Array");
                    paintsInitialLenght = paints.length;
                    $log.info($fmt.sprintf("paints.length:%s", paintsInitialLenght));
                    done();
                }
            });
        });
        //    it("should validate that title is greater than 4 characters");
        //    it("should validate that title is less than 40 characters");
        //    it("should validate that description is greater than 4 characters");
        //    it("should validate that description is less than 250 characters");
        it("should add paint", function (done) {
            $log.info($fmt.sprintf("paint to create: %s", newPaint.title));
            agent.post(paintsUrl).set("authorization", token).send(newPaint).end(function (err, resp) {
                if (err) {
                    $log.error("Error:" + err);
                }
                else {
                    expect(err).equals(null);
                    expect(resp.status).equals(200);
                    $log.debug(moduleName + "@api/paints-POST: respJob.body:" + JSON.stringify(resp.body));
                    var doc = resp.body;
                    $log.info($fmt.sprintf("paint to created: %s", doc.title));
                    expect(doc._id).to.not.be.empty;
                    paintsDocID = doc._id;
                    expect(doc.__v).to.equal(0);
                    //remove added properties from mongodb
                    delete doc._id;
                    delete doc.__v;
                    expect(doc).to.deep.equal(newPaint);
                    done();
                }
            });
        });
        it("should have 1 more paints", function (done) {
            agent.get(paintsUrl).set("authorization", token).end(function (err, resp) {
                if (err) {
                    $log.error("Error:" + err);
                }
                else {
                    expect(err).equals(null);
                    expect(resp.status).equals(200);
                    var paints = resp.body;
                    expect(paints).to.be.a("Array");
                    expect(paints.length).to.be.equal(paintsInitialLenght + 1);
                    $log.info($fmt.sprintf("paints initial length: %s current length:%s", paintsInitialLenght, paints.length));
                    done();
                }
            });
        });
        it("should find paint by id:", function (done) {
            agent.get(paintsUrl + "/" + paintsDocID).set("authorization", token).end(function (err, resp) {
                if (err) {
                    $log.error("Error:" + err);
                }
                else {
                    expect(err).equals(null);
                    expect(resp.status).equals(200);
                    $log.debug(moduleName + "@find: respJob.body:" + JSON.stringify(resp.body));
                    var paints = resp.body;
                    expect(paints).to.be.a("Array");
                    expect(paints.length).length.to.equal(1);
                    var paint = paints[0];
                    //remove added properties from mongodb
                    delete paint._id;
                    delete paint.__v;
                    expect(paint).to.deep.equal(newPaint);
                    done();
                }
            });
        });
        it("should remove paint by id:", function (done) {
            agent.del(paintsUrl + "/" + paintsDocID).set("authorization", token).end(function (err, resp) {
                if (err) {
                    $log.error("Error:" + err);
                }
                else {
                    expect(err).equals(null);
                    expect(resp.status).equals(200);
                    $log.debug(moduleName + "@remove: respJob.body:" + JSON.stringify(resp.body));
                    var paint = resp.body;
                    //remove added properties from mongodb
                    delete paint._id;
                    delete paint.__v;
                    expect(paint).to.deep.equal(newPaint);
                    done();
                }
            });
        });
        it("should have the same number of document", function (done) {
            agent.get(paintsUrl).set("authorization", token).end(function (err, resp) {
                if (err) {
                    $log.error("Error:" + err);
                }
                else {
                    expect(err).equals(null);
                    expect(resp.status).equals(200);
                    var paints = resp.body;
                    expect(paints).to.be.a("Array");
                    expect(paints.length).to.be.equal(paintsInitialLenght);
                    $log.info($fmt.sprintf("paints initial length: %s current length:%s", paintsInitialLenght, paints.length));
                    done();
                }
            });
        });
    });
});
//# sourceMappingURL=paintsRoute-specs.js.map