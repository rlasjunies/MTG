var $log = require("../services/logger");
var chai = require("chai");
var sa = require("superagent");
var $faker = require("faker");
var expect = chai.expect;
var moduleName = "usersRoute-specs - ";
var siteUrl = "http://localhost:3000";
var testUserEmail = "guest@autotest.com";
var testUserPassword = "1234";
var agent = sa.agent();
var token;
var usersUrl = siteUrl + "/api/adm/users";
var usersInitialLenght;
var usersDocID;
var newUser = {
    email: $faker.internet.email(),
    active: true,
    googleId: "googleid",
    facebookId: "facebookid",
    displayName: $faker.internet.userName(),
    password: $faker.internet.password(8, true),
    picture: $faker.internet.avatar(),
    allowedRoles: []
};
describe("Users guest user", function () {
    before(function (done) {
        this.timeout(10000);
        agent
            .post(siteUrl + "/auth/login")
            .send({ email: testUserEmail, password: testUserPassword })
            .end(function (err, resp) {
            if (err) {
                $log.error("Error:" + err);
                $log.error("User " + testUserEmail + " NOT logged:");
            }
            else {
                $log.debug("res.text:" + resp.text);
                var loginAnswer = JSON.parse(resp.text);
                token = "Bearer " + loginAnswer.token;
                $log.info("User " + testUserEmail + " logged:");
                return done();
            }
        });
    });
    describe(usersUrl, function () {
        this.timeout(10000);
        it("Should - NOT be authorized to - get users", function (done) {
            agent.get(usersUrl)
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
        it("should - NOT be authorized to - add user", function (done) {
            $log.info("user to create: " + newUser.displayName);
            agent.post(usersUrl).
                set("authorization", token)
                .send(newUser)
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
        it("should - NOT be authorized to - find user by id:", function (done) {
            agent.get(usersUrl + "/" + usersDocID).
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
        it("should - NOT be authorized to - remove user by id:", function (done) {
            agent.del(usersUrl + "/" + usersDocID).
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
//# sourceMappingURL=usersRoute-guest-specs.js.map