import express = require("express");
import bodyparser = require("body-parser");
import morgan = require("morgan");
import passport = require("passport");

import xLocalStrategy = require("./auth/localStrategy");
import xAuthLocal = require("./auth/localAuth");
import xAuthFacebook = require("./auth/facebookAuth");
import xAuthGoogle = require("./auth/googleAuth");
import xEmailVerif = require("./auth/emailVerification");
import $log = require("./services/logger");

export var app = express();
process.env.NODE_ENV = process.env.NODE_ENV || "development";

import xDb = require("./services/db");
xDb.connect();

app.use(bodyparser.json());
app.use(passport.initialize());

morgan.token("statuscolorized", (expReq, expRes) : string => {
    var color = 32; // green
    var status = expRes.statusCode;
    if (status >= 500) color = 31; // red
    else if (status >= 400) color = 33; // yellow
    else if (status >= 300) color = 36; // cyan
    return "\x1b[" + color + "m:" + status +"\x1b[0m";
});
app.use(morgan(":date[iso] :method :url :statuscolorized :response-time ms - :res[content-length]"));
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


passport.serializeUser((user, done: (err: any, id: any) => void) => {
    done(null, user.id);
});

app.use(function (req: express.Request, res: express.Response, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

passport.use("local-register", xLocalStrategy.register());
passport.use("local-login", xLocalStrategy.login());

app.post("/auth/register", passport.authenticate("local-register"), xAuthLocal.register);
app.get("/auth/verifyemail", xEmailVerif.verify);
app.post("/auth/login", passport.authenticate("local-login"),  xAuthLocal.login);
app.post("/auth/facebook", xAuthFacebook.facebookAuth);
app.post("/auth/google", xAuthGoogle.googleAuth);

import xJobsGet = require("./api/jobs/jobsRoutes");
xJobsGet.routes(app);

app.use("/", express.static(__dirname + "/../seedTSClient/app"));
app.use("/Scripts", express.static(__dirname + "/../seedTSClient/Scripts"));
app.use("/app", express.static(__dirname + "/../seedTSClient/app"));
app.use("/styles", express.static(__dirname + "/../seedTSClient/styles"));
app.use("/fonts", express.static(__dirname + "/../seedTSClient/fonts"));

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
