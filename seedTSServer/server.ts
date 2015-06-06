import express = require("express");
import bodyparser = require("body-parser");
import morgan = require("morgan");
import passport = require("passport");

import xLocalStrategy = require("./auth/localStrategy");
import $AuthLocal = require("./auth/localAuth");
import $Authorization = require("./api/authorization/authorizationService");
import xAuthFacebook = require("./auth/facebookAuth");
import xAuthGoogle = require("./auth/googleAuth");
import xEmailVerif = require("./auth/emailVerification");
import $log = require("./services/logger");
import path = require("path");

//Initialisation of the $
import $ = require("./services/mtg");
$.server.rootPath = __dirname;
$.server.dataPath = path.join($.server.rootPath, "data");
$.server.picturesPath = path.join($.server.dataPath, "pictures");
$.server.accessRightFileName = path.join($.server.rootPath, "api/authorization/accessRights.json");
$.server.rolesFileName = path.join($.server.rootPath, "api/authorization/roles.json");


export var app = express();
process.env.NODE_ENV = process.env.NODE_ENV || "development";

import xDb = require("./services/db");
xDb.connect();

app.use(bodyparser.json());
app.use(passport.initialize());

morgan.token("statuscolorized", (expReq, expRes): string => {
    var color = 32; // green
    var status = expRes.statusCode;
    if (status >= 500) { color = 31; } // red
    else if (status >= 400) {color = 33;} // yellow
    else if (status >= 300) {color = 36;} // cyan
    return "\x1b[" + color + "m:" + status +"\x1b[0m";
});

app.use(morgan(":date[iso] :method :url :statuscolorized :response-time ms - :res[content-length]"));

passport.serializeUser((user, done: (err: any, id: any) => void) => {
    done(null, user.id);
});

app.use(function (req: express.Request, res: express.Response, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

//static files routes
app.use("/", express.static(__dirname + "/../seedTSClient/app"));
app.use("/Scripts", express.static(__dirname + "/../seedTSClient/Scripts"));
app.use("/bower_components", express.static(__dirname + "/../seedTSClient/bower_components"));
app.use("/app", express.static(__dirname + "/../seedTSClient/app"));
app.use("/styles", express.static(__dirname + "/../seedTSClient/styles"));
app.use("/fonts", express.static(__dirname + "/../seedTSClient/fonts"));
app.use("/images", express.static(__dirname + "/../seedTSClient/images"));
app.use("/pictures", express.static($.server.picturesPath));

//authentication strategy
passport.use("local-register", xLocalStrategy.register());
passport.use("local-login", xLocalStrategy.login());

//authentication routes
app.post("/auth/register", passport.authenticate("local-register"), $AuthLocal.register);
app.post("/auth/login", passport.authenticate("local-login"), $AuthLocal.login);
app.get("/auth/verifyemail", xEmailVerif.verify);
app.post("/auth/facebook", xAuthFacebook.facebookAuth);
app.post("/auth/google", xAuthGoogle.googleAuth);

//authorization
import $AuthorizationRoutes = require("./api/authorization/authorizationRoutes");
rootRoute = "/api/authorization/roles";
app.get(rootRoute, $AuthLocal.authenticationCheck, $Authorization.hasRole("ADMIN"), $AuthorizationRoutes.getAllRoles);

//pictures routes
import $PicturesRoutes = require("./api/pictures/picturesRoutes");
rootRoute = "/api/pictures/";
app.post(rootRoute + "upload", $AuthLocal.authenticationCheck, $Authorization.hasRole("ARTIST"), $PicturesRoutes.uploadPicture);
app.get(rootRoute, $AuthLocal.authenticationCheck, $PicturesRoutes.getAllPictures);
app.delete(rootRoute + ":id", $AuthLocal.authenticationCheck, $Authorization.hasRole("ARTIST"), $PicturesRoutes.deletePicture);

//users routes
import $UsersRoutes = require("./api/users/usersRoutes");
rootRoute = "/api/adm/users/";
app.post(rootRoute, $AuthLocal.authenticationCheck, $Authorization.hasRole("ADMIN"), $UsersRoutes.create);
app.get(rootRoute + ":id?", $AuthLocal.authenticationCheck, $UsersRoutes.find);
app.delete(rootRoute + ":id?", $AuthLocal.authenticationCheck, $Authorization.hasRole("ADMIN"), $UsersRoutes.remove);
app.put(rootRoute + ":id?", $AuthLocal.authenticationCheck, $Authorization.hasRole("ADMIN"), $UsersRoutes.update);

//paints routes
import $PaintsRoutes = require("./api/paints/paintsRoutes");
var rootRoute = "/api/paints/";
app.post(rootRoute, $AuthLocal.authenticationCheck, $PaintsRoutes.create);
app.get(rootRoute + ":id?", $AuthLocal.authenticationCheck, $Authorization.hasRole("GUEST"), $PaintsRoutes.find);
app.delete(rootRoute + ":id?", $AuthLocal.authenticationCheck, $Authorization.hasRole(""), $PaintsRoutes.remove);
app.put(rootRoute + ":id?", $AuthLocal.authenticationCheck, $Authorization.hasRole(""), $PaintsRoutes.update);

if (process.env.NODE_ENV === "development") {
    // configure stuff here
}

app.get("*", (req: express.Request, res: express.Response, next) => {
    res.redirect("/app/index.html");
});

if (!process.env.PORT) { process.env.PORT = 3000; }

var srv = app.listen(process.env.PORT, process.env.IP);
srv.on("listening", () => {
    $log.info("webserver listening http requests on:" + process.env.PORT);
});
