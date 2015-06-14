var $log = require("../services/logger");
var chai = require("chai");
var sa = require("superagent");
var $faker = require("faker");
var expect = chai.expect;
var moduleName = "usersRoute-specs - ";
var siteUrl = "http://localhost:3000";
var testUserEmail = "admin@autotest.com";
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
describe("Users admin user", function () {
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
        it("Should get users", function (done) {
            agent.get(usersUrl)
                .set("authorization", token)
                .end(function (err, resp) {
                if (err) {
                    $log.error("Error:" + err);
                }
                else {
                    expect(err).equals(null);
                    expect(resp.status).equals(200);
                    var users = resp.body;
                    $log.debug("resp.body:" + JSON.stringify(resp.body));
                    expect(users).to.be.a("Array");
                    usersInitialLenght = users.length;
                    $log.info("paints.length:" + usersInitialLenght);
                    done();
                }
            });
        });
        it("should add user", function (done) {
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
                    expect(resp.status).equals(200);
                    $log.debug(moduleName + "@api/users-POST: respJob.body:" + JSON.stringify(resp.body));
                    var doc = resp.body;
                    $log.info("user to created: " + doc.displayName);
                    expect(doc._id).to.not.be.empty;
                    usersDocID = doc._id;
                    expect(doc.__v).to.equal(0);
                    delete doc._id;
                    delete doc.__v;
                    delete newUser.password;
                    expect(doc).to.deep.equal(newUser);
                    done();
                }
            });
        });
        it("should have 1 more user", function (done) {
            agent.get(usersUrl)
                .set("authorization", token)
                .end(function (err, resp) {
                if (err) {
                    $log.error("Error:" + err);
                }
                else {
                    expect(err).equals(null);
                    expect(resp.status).equals(200);
                    var listOfUsers = resp.body;
                    expect(listOfUsers).to.be.a("Array");
                    expect(listOfUsers.length).to.be.equal(usersInitialLenght + 1);
                    $log.info("users initial length: " + usersInitialLenght + " current length:" + listOfUsers.length);
                    done();
                }
            });
        });
        it("should find user by id:", function (done) {
            agent.get(usersUrl + "/" + usersDocID).
                set("authorization", token)
                .end(function (err, resp) {
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
                    delete paint._id;
                    delete paint.__v;
                    expect(paint).to.deep.equal(newUser);
                    done();
                }
            });
        });
        it("should remove user by id:", function (done) {
            agent.del(usersUrl + "/" + usersDocID).
                set("authorization", token)
                .end(function (err, resp) {
                if (err) {
                    $log.error("Error:" + err);
                }
                else {
                    expect(err).equals(null);
                    expect(resp.status).equals(200);
                    $log.debug(moduleName + "@remove: respJob.body:" + JSON.stringify(resp.body));
                    var paint = resp.body;
                    delete paint._id;
                    delete paint.__v;
                    expect(paint).to.deep.equal(newUser);
                    done();
                }
            });
        });
        it("should have the same number of documents", function (done) {
            agent.get(usersUrl)
                .set("authorization", token)
                .end(function (err, resp) {
                if (err) {
                    $log.error("Error:" + err);
                }
                else {
                    expect(err).equals(null);
                    expect(resp.status).equals(200);
                    var listOfUsers = resp.body;
                    expect(listOfUsers).to.be.a("Array");
                    expect(listOfUsers.length).to.be.equal(usersInitialLenght);
                    $log.info("users initial length: " + usersInitialLenght + " current length: " + listOfUsers.length);
                    done();
                }
            });
        });
    });
});
//# sourceMappingURL=usersRoute-admin-specs.js.map