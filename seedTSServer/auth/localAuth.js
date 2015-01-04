var xToken = require("./token");
var xEmailVerification = require("./emailVerification");
function register(req, res) {
    xEmailVerification.send(req.body.email, res);
    xToken.createSendToken(req.user, res);
}
exports.register = register;
function login(req, res) {
    xToken.createSendToken(req.user, res);
}
exports.login = login;
//# sourceMappingURL=localAuth.js.map