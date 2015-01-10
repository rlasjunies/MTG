import passport_local = require("passport-local");
import libuser = require("../models/user");
import $log = require("../services/logger");

var moduleName = "localStratregy - ";
var strategyOptions = { usernameField: "email" };
export function login() {
    return new passport_local.Strategy(strategyOptions, (username, password, done) => {
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


export function register() {
    return new passport_local.Strategy(strategyOptions, (username, password, done) => {
        var userModel = libuser.userModel();
        var qryUser = { email: username };

        libuser.userModel().findOne(qryUser, (err, dbUser) => {
            if (err) {
                return done(err);
            }

            if (dbUser) {
                // TODO message not cleat when it happen
                return done(null, false, { message: "email already exists!" });
            }

            var newUser: libuser.IUserDocument = new userModel({
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
