var express = require("express");
var bodyparser = require("body-parser");
var morgan = require("morgan");
var passport = require("passport");
var xLocalStrategy = require("./auth/localStrategy");
var $AuthLocal = require("./auth/localAuth");
var xAuthFacebook = require("./auth/facebookAuth");
var xAuthGoogle = require("./auth/googleAuth");
var xEmailVerif = require("./auth/emailVerification");
var $log = require("./services/logger");
exports.app = express();
process.env.NODE_ENV = process.env.NODE_ENV || "development";
var xDb = require("./services/db");
xDb.connect();
exports.app.use(bodyparser.json());
exports.app.use(passport.initialize());
morgan.token("statuscolorized", function (expReq, expRes) {
    var color = 32; // green
    var status = expRes.statusCode;
    if (status >= 500) {
        color = 31;
    }
    else if (status >= 400) {
        color = 33;
    }
    else if (status >= 300) {
        color = 36;
    } // cyan
    return "\x1b[" + color + "m:" + status + "\x1b[0m";
});
exports.app.use(morgan(":date[iso] :method :url :statuscolorized :response-time ms - :res[content-length]"));
//app.use(morgan("dev"));
//app.use(morgan(function (req, res) {
//    var color = 32; // green
//    var status = res.statusCode;
//    if (status >= 500) color = 31; // red
//    else if (status >= 400) color = 33; // yellow
//    else if (status >= 300) color = 36; // cyan
//    ('\x1b[0m:method :url \x1b[' + color + 'm:status \x1b[0m:response-time ms - :res[content-length]\x1b[0m');
//    return ;
//}));
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
exports.app.post("/auth/register", passport.authenticate("local-register"), $AuthLocal.register);
exports.app.get("/auth/verifyemail", xEmailVerif.verify);
exports.app.post("/auth/login", passport.authenticate("local-login"), $AuthLocal.login);
exports.app.post("/auth/facebook", xAuthFacebook.facebookAuth);
exports.app.post("/auth/google", xAuthGoogle.googleAuth);
var $PaintsRoutes = require("./api/paints/paintsRoutes");
exports.app.post("/api/paints", $AuthLocal.authenticationCheck, $PaintsRoutes.create);
exports.app.get("/api/paints/:id?", $AuthLocal.authenticationCheck, $PaintsRoutes.find);
exports.app.delete("/api/paints/:id?", $AuthLocal.authenticationCheck, $PaintsRoutes.remove);
exports.app.put("/api/paints/:id?", $AuthLocal.authenticationCheck, $PaintsRoutes.update);
exports.app.use("/", express.static(__dirname + "/../seedTSClient/app"));
exports.app.use("/Scripts", express.static(__dirname + "/../seedTSClient/Scripts"));
exports.app.use("/app", express.static(__dirname + "/../seedTSClient/app"));
exports.app.use("/styles", express.static(__dirname + "/../seedTSClient/styles"));
exports.app.use("/fonts", express.static(__dirname + "/../seedTSClient/fonts"));
if (process.env.NODE_ENV === "development") {
}
exports.app.get("*", function (req, res, next) {
    res.redirect("/app/index.html");
});
if (!process.env.PORT) {
    process.env.PORT = 3000;
}
var srv = exports.app.listen(process.env.PORT, process.env.IP);
srv.on("listening", function () {
    $log.info("webserver listening http requests on:" + process.env.PORT);
});
//# sourceMappingURL=server.js.map