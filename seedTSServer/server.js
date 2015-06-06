var express = require("express");
var bodyparser = require("body-parser");
var morgan = require("morgan");
var passport = require("passport");
var xLocalStrategy = require("./auth/localStrategy");
var $AuthLocal = require("./auth/localAuth");
var $Authorization = require("./api/authorization/authorizationService");
var xAuthFacebook = require("./auth/facebookAuth");
var xAuthGoogle = require("./auth/googleAuth");
var xEmailVerif = require("./auth/emailVerification");
var $log = require("./services/logger");
var path = require("path");
//Initialisation of the $
var $ = require("./services/mtg");
$.server.rootPath = __dirname;
$.server.dataPath = path.join($.server.rootPath, "data");
$.server.picturesPath = path.join($.server.dataPath, "pictures");
$.server.accessRightFileName = path.join($.server.rootPath, "api/authorization/accessRights.json");
$.server.rolesFileName = path.join($.server.rootPath, "api/authorization/roles.json");
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
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
exports.app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
//static files routes
exports.app.use("/", express.static(__dirname + "/../seedTSClient/app"));
exports.app.use("/Scripts", express.static(__dirname + "/../seedTSClient/Scripts"));
exports.app.use("/bower_components", express.static(__dirname + "/../seedTSClient/bower_components"));
exports.app.use("/app", express.static(__dirname + "/../seedTSClient/app"));
exports.app.use("/styles", express.static(__dirname + "/../seedTSClient/styles"));
exports.app.use("/fonts", express.static(__dirname + "/../seedTSClient/fonts"));
exports.app.use("/images", express.static(__dirname + "/../seedTSClient/images"));
exports.app.use("/pictures", express.static($.server.picturesPath));
//authentication strategy
passport.use("local-register", xLocalStrategy.register());
passport.use("local-login", xLocalStrategy.login());
//authentication routes
exports.app.post("/auth/register", passport.authenticate("local-register"), $AuthLocal.register);
exports.app.post("/auth/login", passport.authenticate("local-login"), $AuthLocal.login);
exports.app.get("/auth/verifyemail", xEmailVerif.verify);
exports.app.post("/auth/facebook", xAuthFacebook.facebookAuth);
exports.app.post("/auth/google", xAuthGoogle.googleAuth);
//authorization
var $AuthorizationRoutes = require("./api/authorization/authorizationRoutes");
rootRoute = "/api/authorization/roles";
exports.app.get(rootRoute, $AuthLocal.authenticationCheck, $Authorization.hasRole("ADMIN"), $AuthorizationRoutes.getAllRoles);
//pictures routes
var $PicturesRoutes = require("./api/pictures/picturesRoutes");
rootRoute = "/api/pictures/";
exports.app.post(rootRoute + "upload", $AuthLocal.authenticationCheck, $Authorization.hasRole("ARTIST"), $PicturesRoutes.uploadPicture);
exports.app.get(rootRoute, $AuthLocal.authenticationCheck, $PicturesRoutes.getAllPictures);
exports.app.delete(rootRoute + ":id", $AuthLocal.authenticationCheck, $Authorization.hasRole("ARTIST"), $PicturesRoutes.deletePicture);
//users routes
var $UsersRoutes = require("./api/users/usersRoutes");
rootRoute = "/api/adm/users/";
exports.app.post(rootRoute, $AuthLocal.authenticationCheck, $Authorization.hasRole("ADMIN"), $UsersRoutes.create);
exports.app.get(rootRoute + ":id?", $AuthLocal.authenticationCheck, $UsersRoutes.find);
exports.app.delete(rootRoute + ":id?", $AuthLocal.authenticationCheck, $Authorization.hasRole("ADMIN"), $UsersRoutes.remove);
exports.app.put(rootRoute + ":id?", $AuthLocal.authenticationCheck, $Authorization.hasRole("ADMIN"), $UsersRoutes.update);
//paints routes
var $PaintsRoutes = require("./api/paints/paintsRoutes");
var rootRoute = "/api/paints/";
exports.app.post(rootRoute, $AuthLocal.authenticationCheck, $PaintsRoutes.create);
exports.app.get(rootRoute + ":id?", $AuthLocal.authenticationCheck, $Authorization.hasRole("GUEST"), $PaintsRoutes.find);
exports.app.delete(rootRoute + ":id?", $AuthLocal.authenticationCheck, $Authorization.hasRole(""), $PaintsRoutes.remove);
exports.app.put(rootRoute + ":id?", $AuthLocal.authenticationCheck, $Authorization.hasRole(""), $PaintsRoutes.update);
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