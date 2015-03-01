import $log = require("../services/logger");

import chai = require("chai");
import sa = require("superagent");
import $fmt = require("sprintf");
import $faker = require("faker");

var expect = chai.expect;
var moduleName = "usersRoute-specs - ";

import $userCol = require("../models/user");

//Variables used during the test
var siteUrl: string = "http://localhost:3000";
var testUserEmail = "test@g.c";
var testUserPassword = "1234";
var agent = sa.agent();
var token: string;

var usersUrl = siteUrl + "/api/users";
var usersInitialLenght: number;

var usersDocID;

var newUser: $userCol.IUserObject = {
    email: $faker.internet.email(),
    active: true,
    googleId: "googleid",
    facebookId:"facebookid",
    displayName: $faker.internet.userName(),
    password: $faker.internet.password(8, true),
    picture: $faker.internet.avatar()
};

describe("Users ", () => {
    
    before(function (done) {
        this.timeout(10000);
        agent
            .post(siteUrl + "/auth/login")
            .send({ email: testUserEmail, password: testUserPassword })
            .end(function (err, resp: sa.Response) {
                if ( err ) {
                    $log.error("Error:" + err);
                    $log.error($fmt.sprintf("User '%s' NOT logged:", testUserEmail));
                } else {
                        $log.debug("res.text:" + resp.text);
                        var loginAnswer = JSON.parse(resp.text);
                        token = "Bearer " + loginAnswer.token;
                        $log.info($fmt.sprintf("User '%s' logged:", testUserEmail));
                        return done();
                }
            });
    });

    describe(usersUrl, function () {
        this.timeout(10000);

        it("Should get users", function (done) {

            agent.get(usersUrl)
                .set("authorization", token)
                .end((err, resp) => {
                    if (err) {
                        $log.error("Error:" + err);
                    } else {
                        expect(err).equals(null);
                        expect(resp.status).equals(200); // res.should.have.status(200);

                        var users = <$userCol.IUserDocument[]>resp.body;
                        //var paints = resp.body;
                        $log.debug("resp.body:" + JSON.stringify( resp.body ) );
                        expect(users).to.be.a("Array");
                        usersInitialLenght = users.length;
                        $log.info($fmt.sprintf("paints.length:%s", usersInitialLenght));

                        done();
                    }
                });
        });

        //    it("should validate that title is greater than 4 characters");
        //    it("should validate that title is less than 40 characters");
        //    it("should validate that description is greater than 4 characters");
        //    it("should validate that description is less than 250 characters");

        it("should add user", (done) => {
            $log.info($fmt.sprintf("user to create: %s", newUser.displayName));

            agent.post(usersUrl).
                set("authorization", token)
                .send(newUser)
                .end((err, resp: sa.Response) => {
                    if (err) {
                        $log.error("Error:" + err);
                    } else {
                        expect(err).equals(null);
                        expect(resp.status).equals(200); 
                        $log.debug(moduleName + "@api/users-POST: respJob.body:" + JSON.stringify(resp.body));

                        var doc = <$userCol.IUserDocument>resp.body;
                        $log.info($fmt.sprintf("user to created: %s", doc.displayName));

                        expect(doc._id).to.not.be.empty;
                        usersDocID = doc._id;
                        expect(doc.__v).to.equal(0);

                        //remove added properties from mongodb
                        delete doc._id;
                        delete doc.__v;

                        //remove password property from source as is not send back
                        delete newUser.password;
                        expect(doc).to.deep.equal(newUser);
                        done();
                    }
                });
        });

        it("should have 1 more user", function (done) {
            agent.get(usersUrl)
                .set("authorization", token)
            
                .end((err, resp: sa.Response) => {
                    if (err) {
                        $log.error("Error:" + err);
                    } else {
                        expect(err).equals(null);
                        expect(resp.status).equals(200); 

                        var listOfUsers = <$userCol.IUserDocument[]>resp.body;
                        expect(listOfUsers).to.be.a("Array");
                        expect(listOfUsers.length).to.be.equal(usersInitialLenght + 1);

                        $log.info($fmt.sprintf("users initial length: %s current length:%s", usersInitialLenght, listOfUsers.length));

                        done();
                    }
                });
        });

        it("should find user by id:", (done) => {

            agent.get(usersUrl + "/" + usersDocID).
                set("authorization", token)
                .end((err, resp: sa.Response) => {
                    if (err) {
                        $log.error("Error:" + err);
                    } else {

                        expect(err).equals(null);
                        expect(resp.status).equals(200);

                        $log.debug(moduleName + "@find: respJob.body:" + JSON.stringify(resp.body));
                        var paints = <$userCol.IUserDocument[]>resp.body;

                        expect(paints).to.be.a("Array");
                        expect(paints.length).length.to.equal(1);
                        var paint = paints[0];

                        //remove added properties from mongodb
                        delete paint._id;
                        delete paint.__v;
                        expect(paint).to.deep.equal(newUser);
                        done();
                    }
                });
        });

        it("should remove user by id:", (done) => {

            agent.del(usersUrl + "/" + usersDocID).
                set("authorization", token)
                .end((err, resp: sa.Response) => {
                    if (err) {
                        $log.error("Error:" + err);
                    } else {
                        expect(err).equals(null);
                        expect(resp.status).equals(200);

                        $log.debug(moduleName + "@remove: respJob.body:" + JSON.stringify(resp.body));
                        var paint = <$userCol.IUserDocument>resp.body;

                        //remove added properties from mongodb
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
                .end((err, resp: sa.Response) => {
                    if (err) {
                        $log.error("Error:" + err);
                    } else {
                        expect(err).equals(null);
                        expect(resp.status).equals(200);

                        var listOfUsers = <$userCol.IUserDocument[]>resp.body;
                        expect(listOfUsers).to.be.a("Array");
                        expect(listOfUsers.length).to.be.equal(usersInitialLenght);

                        $log.info($fmt.sprintf("users initial length: %s current length:%s", usersInitialLenght, listOfUsers.length));

                        done();
                    }
                });
        });


    });
});

// function loginUser(agent: sa.Agent) {
//    return function () {
//        this.timeout(10000);
//        agent
//            .post(url + "/auth/login")
//            .send({ email: "test@g.c", password: "1234" })
//            .end(onResponse);

//        function onResponse(err, res) {
//            //expect(res.status).to.equals(200);
//            //agent.head ["authorization"] = "hjkl";
//            console.log("................." + res);
//            var loginAnswer = JSON.parse(res.text);
//            token = loginAnswer.token;
//            console.log("token:<<<<<<<<<<<<" + token);
//            //res.text.should.include("Dashboard");
//            //this.timeout(2000);
//            //console.log("logged!!!!!!");

//            return done();
//        }
//    };
// }
