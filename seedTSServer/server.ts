import express = require("express");
import bodyparser = require("body-parser");
import morgan = require("morgan");
import passport = require("passport");

import xLocalStrategy = require("./auth/localStrategy");
import xAuthLocal = require("./auth/localAuth");
import xAuthFacebook = require("./auth/facebookAuth");
import xAuthGoogle = require("./auth/googleAuth");
import xEmailVerif = require("./auth/emailVerification");
import xDb = require("./services/db");

export var app = express();
xDb.connect();

app.use(bodyparser.json());
app.use(passport.initialize());
app.use(morgan("dev"));

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

// app.get("/api/jobs", xJobs.routes);
import xJobsGet = require("./api/jobs/jobsRoutes");
xJobsGet.routes(app);

app.use("/", express.static(__dirname + "/../seedTSClient/app"));
app.use("/Scripts", express.static(__dirname + "/../seedTSClient/Scripts"));
app.use("/app", express.static(__dirname + "/../seedTSClient/app"));
app.use("/styles", express.static(__dirname + "/../seedTSClient/styles"));
app.use("/fonts", express.static(__dirname + "/../seedTSClient/fonts"));

var env = process.env.NODE_ENV || "development";
if ("development" === env) {
    // configure stuff here
}

app.get("*", (req: express.Request, res: express.Response, next) => {
    // res.render("/index.html");
    res.redirect("/app/index.html");
});

if (!process.env.PORT) { process.env.PORT = 3000; }

var srv = app.listen(process.env.PORT, process.env.IP);
srv.on("listening", () => {
    console.log("webserver listening http requests on:" + process.env.PORT);
});
