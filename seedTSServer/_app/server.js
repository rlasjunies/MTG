var express = require("express");
var bodyparser = require("body-parser");
var morgan = require("morgan");
var passport = require("passport");
var xLocalStrategy = require("./authentication/localStrategy");
var $AuthLocal = require("./authentication/localAuth");
var $Authorization = require("./authorization/authorization.middleware");
var xAuthFacebook = require("./authentication/facebookAuth");
var xAuthGoogle = require("./authentication/googleAuth");
var xEmailVerif = require("./authentication/emailVerification");
var $log = require("./services/logger");
var path = require("path");
var $ = require("./services/mtg");
$.server.rootPath = __dirname;
$.server.dataPath = path.join($.server.rootPath, "../_app_data");
$.server.picturesPath = path.join($.server.dataPath, "pictures");
$.server.rolesFileName = path.join($.server.dataPath, "authorization/roles.json");
$.server.accessRightFileName = path.join($.server.dataPath, "authorization/accessRight.json");
$.server.emailVerificationFileName = path.join($.server.rootPath, "../authentication/emailVerification.html");
exports.app = express();
process.env.NODE_ENV = process.env.NODE_ENV || "development";
var xDb = require("./services/db");
xDb.connect();
exports.app.use(bodyparser.json());
exports.app.use(passport.initialize());
morgan.token("statuscolorized", function (expReq, expRes) {
    var color = 32;
    var status = expRes.statusCode;
    if (status >= 500) {
        color = 31;
    }
    else if (status >= 400) {
        color = 33;
    }
    else if (status >= 300) {
        color = 36;
    }
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
exports.app.use("/", express.static(__dirname + "/../../seedTSClient/app"));
exports.app.use("/Scripts", express.static(__dirname + "/../../seedTSClient/Scripts"));
exports.app.use("/bower_components", express.static(__dirname + "/../../seedTSClient/bower_components"));
exports.app.use("/app", express.static(__dirname + "/../../seedTSClient/app"));
exports.app.use("/styles", express.static(__dirname + "/../../seedTSClient/styles"));
exports.app.use("/fonts", express.static(__dirname + "/../../seedTSClient/fonts"));
exports.app.use("/images", express.static(__dirname + "/../../seedTSClient/images"));
exports.app.use("/pictures", express.static($.server.picturesPath));
passport.use("local-register", xLocalStrategy.register());
passport.use("local-login", xLocalStrategy.login());
exports.app.post("/auth/register", passport.authenticate("local-register"), $AuthLocal.register);
exports.app.post("/auth/login", passport.authenticate("local-login"), $AuthLocal.login);
exports.app.get("/auth/verifyemail", xEmailVerif.verify);
exports.app.post("/auth/facebook", xAuthFacebook.facebookAuth);
exports.app.post("/auth/google", xAuthGoogle.googleAuth);
var $AuthorizationRoutes = require("./authorization/authorizationRoutes");
rootRoute = "/api/authorization/roles";
exports.app.get(rootRoute, $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("ROLES_GET_ALL"), $AuthorizationRoutes.getAllRoles);
var $PicturesRoutes = require("./pictures/picturesRoutes");
rootRoute = "/api/pictures/";
exports.app.post(rootRoute + "upload", $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("PICTURES_POST_UPLOAD"), $PicturesRoutes.uploadPicture);
exports.app.get(rootRoute, $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("PICTURES_GET_ALL"), $PicturesRoutes.getAllPictures);
exports.app.delete(rootRoute + ":id", $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("PICTURES_DELETE_ID"), $PicturesRoutes.deletePicture);
var $UsersRoutes = require("./users/usersRoutes");
rootRoute = "/api/adm/users/";
exports.app.post(rootRoute, $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("USERS_POST_CREATE"), $UsersRoutes.create);
exports.app.get(rootRoute + ":id?", $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("USERS_GET_ID"), $UsersRoutes.find);
exports.app.delete(rootRoute + ":id?", $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("USERS_DELETE_ID"), $UsersRoutes.remove);
exports.app.put(rootRoute + ":id?", $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("USERS_PUT_ID"), $UsersRoutes.update);
rootRoute = "/api/adm/users/me";
exports.app.get(rootRoute, $AuthLocal.authenticationCheck, $UsersRoutes.findMe);
exports.app.put(rootRoute, $AuthLocal.authenticationCheck, $UsersRoutes.updateMe);
var $PaintsRoutes = require("./paints/paintsRoutes");
var rootRoute = "/api/paints/";
exports.app.post(rootRoute, $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("PAINTS_POST"), $PaintsRoutes.create);
exports.app.get(rootRoute + ":id?", $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("PAINTS_GET_ID"), $PaintsRoutes.find);
exports.app.delete(rootRoute + ":id?", $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("PAINTS_DELETE_ID"), $PaintsRoutes.remove);
exports.app.put(rootRoute + ":id?", $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("PAINTS_PUT_ID"), $PaintsRoutes.update);
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