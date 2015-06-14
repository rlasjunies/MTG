import express = require("express");
import bodyparser = require("body-parser");
import morgan = require("morgan");
import passport = require("passport");

import xLocalStrategy = require("./authentication/localStrategy");
import $AuthLocal = require("./authentication/localAuth");
import $Authorization = require("./authorization/authorization.middleware");
import xAuthFacebook = require("./authentication/facebookAuth");
import xAuthGoogle = require("./authentication/googleAuth");
import xEmailVerif = require("./authentication/emailVerification");
import $log = require("./services/logger");
import path = require("path"); 


//Initialisation of the $
import $ = require("./services/mtg"); 
$.server.rootPath = __dirname;
$.server.dataPath = path.join($.server.rootPath, "../_app_data");
$.server.picturesPath = path.join($.server.dataPath, "pictures");
$.server.rolesFileName = path.join($.server.dataPath, "authorization/roles.json");
$.server.accessRightFileName = path.join($.server.dataPath, "authorization/accessRight.json");
$.server.emailVerificationFileName = path.join($.server.rootPath, "../authentication/emailVerification.html");

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
app.use("/", express.static(__dirname + "/../../seedTSClient/app"));
app.use("/Scripts", express.static(__dirname + "/../../seedTSClient/Scripts"));
app.use("/bower_components", express.static(__dirname + "/../../seedTSClient/bower_components"));
app.use("/app", express.static(__dirname + "/../../seedTSClient/app"));
app.use("/styles", express.static(__dirname + "/../../seedTSClient/styles"));
app.use("/fonts", express.static(__dirname + "/../../seedTSClient/fonts"));
app.use("/images", express.static(__dirname + "/../../seedTSClient/images"));
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
import $AuthorizationRoutes = require("./authorization/authorizationRoutes");
rootRoute = "/api/authorization/roles";
app.get(rootRoute, $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("ROLES_GET_ALL"), $AuthorizationRoutes.getAllRoles);

//pictures routes
import $PicturesRoutes = require("./pictures/picturesRoutes");
rootRoute = "/api/pictures/";
app.post(rootRoute + "upload", $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("PICTURES_POST_UPLOAD"), $PicturesRoutes.uploadPicture);
app.get(rootRoute, $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("PICTURES_GET_ALL"), $PicturesRoutes.getAllPictures);
app.delete(rootRoute + ":id", $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("PICTURES_DELETE_ID"), $PicturesRoutes.deletePicture);

//users routes
import $UsersRoutes = require("./users/usersRoutes");
rootRoute = "/api/adm/users/";
app.post(rootRoute, $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("USERS_POST_CREATE"), $UsersRoutes.create);
app.get(rootRoute + ":id?", $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("USERS_GET_ID"), $UsersRoutes.find);
app.delete(rootRoute + ":id?", $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("USERS_DELETE_ID"), $UsersRoutes.remove);
app.put(rootRoute + ":id?", $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("USERS_PUT_ID"), $UsersRoutes.update);

rootRoute = "/api/adm/users/me";
app.get(rootRoute, $AuthLocal.authenticationCheck, $UsersRoutes.findMe);
app.put(rootRoute, $AuthLocal.authenticationCheck, $UsersRoutes.updateMe);

//paints routes
import $PaintsRoutes = require("./paints/paintsRoutes");
var rootRoute = "/api/paints/";
app.post(rootRoute, $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("PAINTS_POST"),$PaintsRoutes.create);
app.get(rootRoute + ":id?", $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("PAINTS_GET_ID"), $PaintsRoutes.find);
app.delete(rootRoute + ":id?", $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("PAINTS_DELETE_ID"), $PaintsRoutes.remove);
app.put(rootRoute + ":id?", $AuthLocal.authenticationCheck, $Authorization.checksAccessRight("PAINTS_PUT_ID"), $PaintsRoutes.update);

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
