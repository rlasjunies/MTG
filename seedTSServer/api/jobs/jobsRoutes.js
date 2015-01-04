// import Promise = require("bluebird");
var jwt = require("jwt-simple");
var xJobModel = require("../../models/jobsModel");
var xConfig = require("../../services/config");
function routes(app) {
    console.log("Jobs - init routes");
    app.route("/api/jobs").post(function (req, res, next) {
        var job = xJobModel.jobModel();
        var newJob = new job(req.body);
        newJob.save(function (err, job) {
            if (err) {
                return res.status(500).write({ message: "Error writing job!" });
            }
            res.status(200).send(job);
            // Job.findById(doc._id).exec((err, doc) => {
            //    console.log("222222222/api/jobs-POST: create ok:" + JSON.stringify(doc.toJSON()));
            //    if (err) return next(err);
            // })
        });
        // return xJobModel.jobModel().create(req.body).then((resp) => {
        //            console.log("/api/jobs-POST: create ok:" + JSON.stringify(resp));
        //            return res.status(200).send(resp);
        //        })
        //        .reject((err) => {
        //            console.log("error creating post");
        //            throw err;
        //        });
    }).get(function (req, res, next) {
        console.log("/api/jobs-GET: start");
        if (!req.headers["authorization"]) {
            return res.status(401).send({ message: "you are not authorized!" });
        }
        else {
            console.log("req.headers['authorization']" + req.headers["authorization"]);
            //var token = req.headers["authorization"].split(" ")[1];
            var token = req.headers["authorization"];
            console.log("token:" + token);
            var payload = jwt.decode(token, xConfig.JWT_SECRET);
            if (!payload.sub) {
                return res.status(401).send({ message: "Authentication failed" });
            }
            else {
                // return res.json(jobs);
                var jobs = xJobModel.jobModel();
                jobs.find({}, function (err, jobs) {
                    if (err) {
                        return res.status(500).write({ message: "Error getting jobs!" });
                    }
                    res.status(200).send(jobs);
                });
            }
        }
    });
}
exports.routes = routes;
;
//# sourceMappingURL=jobsRoutes.js.map