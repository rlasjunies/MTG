var passport_local = require("passport-local");
var libuser = require("../models/user");
var $log = require("../services/logger");
var moduleName = "localStratregy - ";
var strategyOptions = { usernameField: "email" };
function login() {
    return new passport_local.Strategy(strategyOptions, function (username, password, done) {
        var qryUser = { email: username };
        libuser.userModel().findOne(qryUser, function (err, dbUser) {
            if (err) {
                return done(err);
            }
            if (!dbUser) {
                // TODO again the message is not "readable for the client part
                return done(null, false, { message: "Wrong email / password" });
            }
            dbUser.comparePasswords(password, function (err, isMatching) {
                if (err) {
                    return done(err);
                }
                if (!isMatching) {
                    return done(null, false, { message: "Wrong email / password" });
                }
                $log.info("User: %s logged in", dbUser.email);
                return done(null, dbUser);
            });
        });
    });
}
exports.login = login;
function register() {
    return new passport_local.Strategy(strategyOptions, function (username, password, done) {
        var userModel = libuser.userModel();
        var qryUser = { email: username };
        libuser.userModel().findOne(qryUser, function (err, dbUser) {
            if (err) {
                return done(err);
            }
            if (dbUser) {
                // TODO message not cleat when it happen
                return done(null, false, { message: "email already exists!" });
            }
            var newUser = new userModel({
                email: username,
                password: password
            });
            newUser.save(function (err) {
                if (err) {
                    return done(err);
                }
                return done(null, newUser);
            });
        });
    });
}
exports.register = register;
//# sourceMappingURL=localStrategy.js.map