var libRequest = require("request");
var libUser = require("../models/user");
var libToken = require("./token");
var $ConfigSecret = require("../services/configSecret");
function googleAuth(expReq, expRes) {
    var tsBody = expReq.body;
    var opt = {
        url: "https://accounts.google.com/o/oauth2/token",
        json: true,
        form: {
            code: tsBody.code,
            client_id: tsBody.clientId,
            redirect_uri: tsBody.redirectUri,
            grant_type: "authorization_code",
            client_secret: $ConfigSecret.GOOGLE_SECRET
        }
    };
    libRequest.post(opt, function (err, response, token) {
        if (err) {
            throw err;
        }
        var accessToken = token.access_token;
        var headers = {};
        headers["Authorization"] = "Bearer " + accessToken;
        var requestParams = {};
        requestParams.url = "https://www.googleapis.com/plus/v1/people/me/openIdConnect";
        requestParams.headers = headers;
        requestParams.json = true;
        libRequest.get(requestParams, function (err, response, profile) {
            if (err) {
                throw err;
            }
            var userModel = libUser.userModel();
            userModel.findOne({
                email: profile.email
            }, function (err, foundUser) {
                if (foundUser) {
                    return libToken.createSendToken(foundUser, expRes);
                }
                var userModel = libUser.userModel();
                var userDoc = new userModel({});
                userDoc.email = profile.email;
                userDoc.displayName = profile.name;
                userDoc.googleId = profile.sub;
                userDoc.picture = profile.picture;
                userDoc.save(function (err) {
                    if (err) {
                        throw err;
                    }
                    libToken.createSendToken(userDoc, expRes);
                });
            });
        });
    });
}
exports.googleAuth = googleAuth;
//# sourceMappingURL=googleAuth.js.map