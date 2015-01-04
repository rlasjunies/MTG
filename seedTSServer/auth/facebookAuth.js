var qs = require("querystring");
var request = require("request");
var libConfig = require("../services/config");
var libUser = require("../models/user");
var libToken = require("./token");
function facebookAuth(expReq, expRes) {
    var accessTokenUrl = "https://graph.facebook.com/oauth/access_token";
    var graphApiUrl = "https://graph.facebook.com/me";
    var params = {
        client_id: expReq.body.clientId,
        redirect_uri: expReq.body.redirectUri,
        client_secret: libConfig.FACEBOOK_SECRET,
        code: expReq.body.code
    };
    request.get({
        url: accessTokenUrl,
        qs: params
    }, function (err, response, accessToken) {
        accessToken = qs.parse(accessToken);
        request.get({
            url: graphApiUrl,
            qs: accessToken,
            json: true
        }, function (err, response, profile) {
            var users = libUser.userModel();
            users.findOne({ facebookId: profile.id }, function (err, existingUser) {
                if (existingUser) {
                    return libToken.createSendToken(existingUser, expRes);
                }
                var newUser = new users({});
                newUser.facebookId = profile.id;
                newUser.displayName = profile.name;
                // TODO pretty sure it"s not good to store only these information, what"s happen if the SAME user 
                // login with goodle or local authentication?
                newUser.save(function (err, resp) {
                    if (err) {
                        throw err;
                    }
                    libToken.createSendToken(newUser, expRes);
                });
            });
        });
    });
}
exports.facebookAuth = facebookAuth;
//# sourceMappingURL=facebookAuth.js.map