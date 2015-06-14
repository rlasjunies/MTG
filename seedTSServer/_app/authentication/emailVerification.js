var _ = require("underscore");
var jwt = require("jwt-simple");
var fs = require("fs");
var nodemailer = require("nodemailer");
var $ConfigSecret = require("../services/configSecret");
var $Config = require("../services/config");
var xUser = require("../models/user");
var $ = require("../services/mtg");
function send(email, res) {
    var payload = {
        sub: email
    };
    var token = jwt.encode(payload, $ConfigSecret.EMAIL_SECRET);
    var nSMTPTransportOptions = {
        service: "Gmail",
        auth: {
            user: "rlasjunies@gmail.com",
            pass: $ConfigSecret.SMTP_PASS
        }
    };
    var transporter = nodemailer.createTransport(nSMTPTransportOptions);
    var mailOptions = {
        from: "Richard Lasjunies<rlasjunies@gmail.com>",
        to: email,
        subject: "PS Jwt Account verification",
        html: getHtml(token)
    };
    transporter.sendMail(mailOptions, function (err) {
        if (err) {
            $.log.error("Verification email - Error sending to:" + mailOptions.to);
        }
        else {
            $.log.info("Verification email sent to:" + mailOptions.to);
        }
    });
}
exports.send = send;
function verify(req, res, next) {
    var token = req.query.token;
    var payload = jwt.decode(token, $ConfigSecret.EMAIL_SECRET);
    var email = payload.sub;
    if (!email) {
        return handleError(res);
    }
    var users = xUser.userModel();
    users.findOne({ email: email }, function (err, userFound) {
        if (err) {
            return res.status(500);
        }
        if (!userFound) {
            return handleError(res);
        }
        if (!userFound.active) {
            userFound.active = true;
        }
        userFound.save(function (err, userFound) {
            if (err) {
                return res.status(500);
            }
            return res.redirect($Config.appUrl[process.env]);
        });
    });
}
exports.verify = verify;
function handleError(res) {
    return res.status(401).send({
        message: "Authentication failed, enable to verify the email"
    });
}
function getHtml(token) {
    var model = {
        verifyUrl: "http://localhost:3000/auth/verifyemail?token=" + token,
        title: "psJwt",
        subTitle: "Thanks for signing up!",
        body: "Please, verify your email address by clicking the button below."
    };
    var html = fs.readFileSync($.server.emailVerificationFileName, { encoding: "utf8" });
    var template = _.template(html);
    var sReturn = template(model);
    return sReturn;
}
_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};
//# sourceMappingURL=emailVerification.js.map