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

import $log = require("../services/logger");
  
import chai = require("chai");
import sa = require("superagent");
//import $fmt = require("sprintf");
import $faker = require("faker"); 

var expect = chai.expect;
var moduleName = "paintsRoute-specs - ";

import $paintCol = require("../models/paints");
 
//Variables used during the test
var siteUrl: string = "http://localhost:3000";
//var noneUser = "none@autotest.com";
//var guestUser = "guest@autotest.com";
//var artistUser = "artist@autotest.com";
var adminUser = "admin@autotest.com";

var password = "1234";

var agent = sa.agent();
var token: string;

var paintsUrl = siteUrl + "/api/paints";
var paintsInitialLenght: number;
 
var paintsDocID;
var newPaint: $paintCol.IPaintObject = {
    title: $faker.lorem.sentence(),
    description: $faker.lorem.sentences()
};

describe("Paints by adminUser", () => {
    before(function (done) {
        this.timeout(10000);
        agent
            .post(siteUrl + "/auth/login")
            .send({ email: adminUser, password: password })
            .end(function (err, resp: sa.Response) {
                if ( err ) {
                    $log.error("Error:" + err);
                    $log.error(`User ${adminUser} NOT logged`);
                } else {
                        $log.debug("res.text:" + resp.text);
                        var loginAnswer = JSON.parse(resp.text);
                        token = "Bearer " + loginAnswer.token;
                        $log.info(`User ${adminUser} logged`);
                        return done();
                }
            });
    });

    describe(paintsUrl, function () {

        it("Should - NOT be authorized to - get paints", function (done) {

            agent.get(paintsUrl)
                .set("authorization", token)
                .end((err, resp) => {
                    if (err) {
                        $log.error("Error:" + err);
                    } else {
                        expect(err).equals(null);
                        expect(resp.status).equals(403); // res.should.have.status(200);

                        // var paints = <$paintCol.IPaintDocument[]>resp.body;
                        // //var paints = resp.body;
                        // $log.debug("resp.body:" + JSON.stringify( resp.body ) );
                        // expect(paints).to.be.a("Array");
                        // paintsInitialLenght = paints.length;
                        // $log.info(`paints.length:${paintsInitialLenght}`);

                        done();
                    }
                });
        });

        //    it("should validate that title is greater than 4 characters");
        //    it("should validate that title is less than 40 characters");
        //    it("should validate that description is greater than 4 characters");
        //    it("should validate that description is less than 250 characters");

        it("should - NOT be authorized to - add paint", (done) => {

            $log.info(`paint to create: ${newPaint.title}`);

            agent.post(paintsUrl).
                set("authorization", token)
                .send(newPaint)
                .end((err, resp: sa.Response) => {
                    if (err) {
                        $log.error("Error:" + err);
                    } else {


                        expect(err).equals(null);
                        expect(resp.status).equals(403); 
//                         $log.debug(moduleName + "@api/paints-POST: respJob.body:" + JSON.stringify(resp.body));
// 
//                         var doc = <$paintCol.IPaintDocument>resp.body;
//                         $log.info(`paint to create: ${doc.title}`);
// 
//                         expect(doc._id).to.not.be.empty;
//                         paintsDocID = doc._id;
//                         expect(doc.__v).to.equal(0);
// 
//                         //remove added properties from mongodb
//                         delete doc._id;
//                         delete doc.__v;
//                         expect(doc).to.deep.equal(newPaint);
                        done();
                    }
                });
        });

        it("should - NOT be authorized to - find paint by id:", (done) => {

            agent.get(paintsUrl + "/" + paintsDocID).
                set("authorization", token)
                .end((err, resp: sa.Response) => {
                    if (err) {
                        $log.error("Error:" + err);
                    } else {

                        expect(err).equals(null);
                        expect(resp.status).equals(403);

//                         $log.debug(moduleName + "@find: respJob.body:" + JSON.stringify(resp.body));
//                         var paints = <$paintCol.IPaintDocument[]>resp.body;
// 
//                         expect(paints).to.be.a("Array");
//                         expect(paints.length).length.to.equal(1);
//                         var paint = paints[0];
// 
//                         //remove added properties from mongodb
//                         delete paint._id;
//                         delete paint.__v;
//                         expect(paint).to.deep.equal(newPaint);
                        done();
                    }
                });
        });

        it("should - NOT be authorized to - remove paint by id:", (done) => {

            agent.del(paintsUrl + "/" + paintsDocID).
                set("authorization", token)
                .end((err, resp: sa.Response) => {
                    if (err) {
                        $log.error("Error:" + err);
                    } else {
                        expect(err).equals(null);
                        expect(resp.status).equals(403);

//                         $log.debug(moduleName + "@remove: respJob.body:" + JSON.stringify(resp.body));
//                         var paint = <$paintCol.IPaintDocument>resp.body;
// 
//                         //remove added properties from mongodb
//                         delete paint._id;
//                         delete paint.__v;
//                         expect(paint).to.deep.equal(newPaint);
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
