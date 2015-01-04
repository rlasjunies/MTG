var express = require("express");
var bodyparser = require("body-parser");
var morgan = require("morgan");
var passport = require("passport");
var xLocalStrategy = require("./auth/localStrategy");
var xAuthLocal = require("./auth/localAuth");
var xAuthFacebook = require("./auth/facebookAuth");
var xAuthGoogle = require("./auth/googleAuth");
var xEmailVerif = require("./auth/emailVerification");
var xDb = require("./services/db");
exports.app = express();
xDb.connect();
exports.app.use(bodyparser.json());
exports.app.use(passport.initialize());
exports.app.use(morgan("dev"));
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
exports.app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
passport.use("local-register", xLocalStrategy.register());
passport.use("local-login", xLocalStrategy.login());
exports.app.post("/auth/register", passport.authenticate("local-register"), xAuthLocal.register);
exports.app.get("/auth/verifyemail", xEmailVerif.verify);
exports.app.post("/auth/login", passport.authenticate("local-login"), xAuthLocal.login);
exports.app.post("/auth/facebook", xAuthFacebook.facebookAuth);
exports.app.post("/auth/google", xAuthGoogle.googleAuth);
// app.get("/api/jobs", xJobs.routes);
var xJobsGet = require("./api/jobs/jobsRoutes");
xJobsGet.routes(exports.app);
exports.app.use("/", express.static(__dirname + "/../seedTSClient/app"));
exports.app.use("/Scripts", express.static(__dirname + "/../seedTSClient/Scripts"));
exports.app.use("/app", express.static(__dirname + "/../seedTSClient/app"));
exports.app.use("/styles", express.static(__dirname + "/../seedTSClient/styles"));
exports.app.use("/fonts", express.static(__dirname + "/../seedTSClient/fonts"));
var env = process.env.NODE_ENV || "development";
if ("development" === env) {
}
exports.app.get("*", function (req, res, next) {
    // res.render("/index.html");
    res.redirect("/app/index.html");
});
if (!process.env.PORT) {
    process.env.PORT = 3000;
}
var srv = exports.app.listen(process.env.PORT, process.env.IP);
srv.on("listening", function () {
    console.log("webserver listening http requests on:" + process.env.PORT);
});
//# sourceMappingURL=server.js.map