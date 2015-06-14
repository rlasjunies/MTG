var jwt = require("jwt-simple");
var moment = require("moment");
var $Token = require("./token");
var $EmailVerification = require("./emailVerification");
var $log = require("../services/logger");
var $configSecret = require("../services/configSecret");
var $ = require("../services/mtg");
var $usersModel = require("../models/user");
var moduleName = "localAuth";
function register(expReq, expRes, info) {
    $EmailVerification.send(expReq.body.email, expRes);
    $Token.createSendToken(expReq.user, expRes);
}
exports.register = register;
function login(expReq, expRes, info) {
    $Token.createSendToken(expReq.user, expRes);
}
exports.login = login;
function authenticationCheck(expReq, expRes, next) {
    if (!expReq.headers["authorization"]) {
        return expRes.status(401).send({ message: "you are not authorized!" });
    }
    else {
        $log.debug(moduleName + "@authentication: req.headers['authorization']" + expReq.headers["authorization"]);
        var authorization = expReq.headers["authorization"];
        var token = authorization.split(" ")[1];
        try {
            var payload = jwt.decode(token, $configSecret.JWT_SECRET);
        }
        catch (e) {
            payload = {};
        }
        if (!payload.sub) {
            return expRes.status(401).send({ message: "Authentication failed" });
        }
        else {
            if (moment.unix(payload.exp).diff(moment(), 'second') < 0) {
                console.log("!!!!token expired!!!");
            }
            var users = $usersModel.userModel();
            var qry = { _id: payload.sub };
            users.find(qry, function (err, user) {
                if (err) {
                    return expRes.status(500).write({ message: "Error trying to find the user." + JSON.stringify(err) });
                }
                $.log.debug("expReq.params.id:" + expReq.params.id);
                $.log.profile(moduleName + "@find");
                expReq.user = user[0]._doc;
                next();
            });
        }
    }
}
exports.authenticationCheck = authenticationCheck;
//# sourceMappingURL=localAuth.js.map