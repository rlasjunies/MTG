import jwt = require("jwt-simple");
import moment = require("moment");
import $configSecret = require("../services/configSecret");

export function createSendToken(user, res) {
    var payload = {
        sub: user.id,
        // TODO check that the expiration is well managed by the token
        // expiration should be renewed everytime the user, is doing somehitng!!!
        exp: moment().add(1, "minutes").unix()
    };

    var token = jwt.encode(payload, $configSecret.JWT_SECRET);

    // RL- attention changement
    return res.status(200).send({
        user: user.toJSON(),
        token: token
    });
}
