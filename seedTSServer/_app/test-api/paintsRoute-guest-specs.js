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
var $faker = require("faker");
var expect = chai.expect;
var moduleName = "paintsRoute-specs - ";
var siteUrl = "http://localhost:3000";
var guestUser = "guest@autotest.com";
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
describe("Paints by guestUser", function () {
    before(function (done) {
        this.timeout(10000);
        agent
            .post(siteUrl + "/auth/login")
            .send({ email: guestUser, password: password })
            .end(function (err, resp) {
            if (err) {
                $log.error("Error:" + err);
                $log.error("User " + guestUser + " NOT logged");
            }
            else {
                $log.debug("res.text:" + resp.text);
                var loginAnswer = JSON.parse(resp.text);
                token = "Bearer " + loginAnswer.token;
                $log.info("User " + guestUser + " logged");
                return done();
            }
        });
    });
    describe(paintsUrl, function () {
        it("Should - NOT be authorized to - get paints", function (done) {
            agent.get(paintsUrl)
                .set("authorization", token)
                .end(function (err, resp) {
                if (err) {
                    $log.error("Error:" + err);
                }
                else {
                    expect(err).equals(null);
                    expect(resp.status).equals(403);
                    done();
                }
            });
        });
        it("should - NOT be authorized to - add paint", function (done) {
            $log.info("paint to create: " + newPaint.title);
            agent.post(paintsUrl).
                set("authorization", token)
                .send(newPaint)
                .end(function (err, resp) {
                if (err) {
                    $log.error("Error:" + err);
                }
                else {
                    expect(err).equals(null);
                    expect(resp.status).equals(403);
                    done();
                }
            });
        });
        it("should - NOT be authorized to - find paint by id:", function (done) {
            agent.get(paintsUrl + "/" + paintsDocID).
                set("authorization", token)
                .end(function (err, resp) {
                if (err) {
                    $log.error("Error:" + err);
                }
                else {
                    expect(err).equals(null);
                    expect(resp.status).equals(403);
                    done();
                }
            });
        });
        it("should - NOT be authorized to - remove paint by id:", function (done) {
            agent.del(paintsUrl + "/" + paintsDocID).
                set("authorization", token)
                .end(function (err, resp) {
                if (err) {
                    $log.error("Error:" + err);
                }
                else {
                    expect(err).equals(null);
                    expect(resp.status).equals(403);
                    done();
                }
            });
        });
    });
});
//# sourceMappingURL=paintsRoute-guest-specs.js.map