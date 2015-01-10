import chai = require("chai");
import xDbLib = require("../services/db");
// import xConfig = require("../services/config");
import $paintModel = require("../models/paintModel");
import $paintsData = require("../api/paints/paintsData");
import $Config = require("../services/config");
import $ConfigSecret = require("../services/configSecret");
import $log = require("../services/logger");

var expect = chai.expect;
process.env.NODE_ENV = process.env.NODE_ENV || "development";

describe("get jobs", function () {

    var paints: $paintModel.IPaintDocument[];

    before((done) => {
        $log.debug("process.env:" + process.env.NODE_ENV);
        $log.debug("$Config.dbConnectString[process.env.NODE_ENV]" + $Config.dbConnectString[process.env.NODE_ENV]);
        $log.debug("$Config.dbConnectString[process.env.NODE_ENV].replace('XXXXXX', $ConfigSecret.db[process.env.NODE_ENV]):"
            + $Config.dbConnectString[process.env.NODE_ENV].replace("XXXXXX", $ConfigSecret.db[process.env.NODE_ENV]));
        xDbLib.connectDB($Config.dbConnectString[process.env.NODE_ENV].replace("XXXXXX", $ConfigSecret.db[process.env.NODE_ENV]))
            // .then($paintsData.resetPaints)
            // .then($paintsData.populate)
            .then($paintModel.findPaints)
            .then(function (collection) {
                paints = collection;
                done();
            });
    });

    it("should never be empty since jobs are seeded", function (done) {
        expect(paints.length).to.be.at.least(1);
        done();
    }); 

    it("title should not be empty", function (done) {
        expect(paints[0].title).to.be.not.empty;
        done();
    });

    it("decription should not be empty", function (done) {
        expect(paints[0].description).to.be.not.empty;
        done();
    });

    after((done) => {
        xDbLib.disConnectDB()
            .then(done);
    });

});
