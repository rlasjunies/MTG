var jwt = require("jwt-simple");
var moment = require("moment");
var $configSecret = require("../services/configSecret");
function createSendToken(user, res) {
    var payload = {
        sub: user.id,
        exp: moment().add(360, "minutes").unix()
    };
    var token = jwt.encode(payload, $configSecret.JWT_SECRET);
    return res.status(200).send({
        user: user.toJSON(),
        token: token
    });
}
exports.createSendToken = createSendToken;
//# sourceMappingURL=token.js.map