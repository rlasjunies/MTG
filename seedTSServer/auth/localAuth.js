var jwt = require("jwt-simple");
var $Token = require("./token");
var $EmailVerification = require("./emailVerification");
var $log = require("../services/logger");
var $configSecret = require("../services/configSecret");
var moduleName = "localAuth";
function register(expReq, expRes) {
    $EmailVerification.send(expReq.body.email, expRes);
    $Token.createSendToken(expReq.user, expRes);
}
exports.register = register;
function login(expReq, expRes) {
    $Token.createSendToken(expReq.user, expRes);
}
exports.login = login;
function authenticationCheck(expReq, expRes, next) {
    if (!expReq.headers["authorization"]) {
        return expRes.status(401).send({ message: "you are not authorized!" });
    }
    else {
        $log.debug(moduleName + "@authentication: req.headers['authorization']" + expReq.headers["authorization"]);
        var token = expReq.headers["authorization"];
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
            next();
        }
    }
}
exports.authenticationCheck = authenticationCheck;
//# sourceMappingURL=localAuth.js.map