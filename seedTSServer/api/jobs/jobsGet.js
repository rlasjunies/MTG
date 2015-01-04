var jwt = require("jwt-simple");
var xConfig = require("../../services/config");
var jobs = [{ name: "IT eng." }, { name: "Painter" }, { name: "Assistant" }, { name: "Boucher" }, { name: "Driver" }];
function getJobs(req, res) {
    if (!req.headers["authorization"]) {
        return res.status(401).send({ message: "you are not authorized!" });
    }
    else {
        var token = req.headers["authorization"].split(" ")[1];
        var payload = jwt.decode(token, xConfig.JWT_SECRET);
        if (!payload.sub) {
            return res.status(401).send({ message: 'Authentication failed' });
        }
        else {
            return res.json(jobs);
        }
    }
}
exports.getJobs = getJobs;
;
//# sourceMappingURL=jobsGet.js.map