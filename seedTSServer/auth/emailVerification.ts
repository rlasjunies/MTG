import e = require("express");
import _ = require("underscore");
import jwt = require("jwt-simple");
import fs = require("fs");
import nodemailer = require("nodemailer");

import $ConfigSecret = require("../services/configSecret");
import $Config = require("../services/config");
import xUser = require("../models/user");

// import smtpTransport = require("nodemailer-smtp-transport");

interface IModel {
    verifyUrl: string;
    title: string;
    subTitle: string;
    body: string;
}

interface IPayload {
    sub:string
}

export function send(email, res) {
    var payload : IPayload = {
        sub: email
    };

    var token = jwt.encode(payload, $ConfigSecret.EMAIL_SECRET);

    var nSMTPTransportOptions: NodemailerSMTPTransportOptions = {
        service: "Gmail",
        auth: {
            user: "rlasjunies@gmail.com",
            pass: $ConfigSecret.SMTP_PASS
        }
    };

    var transporter = nodemailer.createTransport(nSMTPTransportOptions);

    var mailOptions: MailComposer = {
        from: "Richard Lasjunies<rlasjunies@gmail.com",
        to: email,
        subject: "PS Jwt Account verification",
        html: getHtml(token)
    };

    transporter.sendMail(mailOptions, (err:Error) => {
        if (err) {
            return res.status(500, err);
        }

        console.log("Verification email sent to:" + mailOptions.to);
    });
}

export function verify(req: e.xRequest<e.IRouteParamEmpty>, res:e.Response, next) {
    var token = req.query.token;

    var payload : IPayload = jwt.decode(token, $ConfigSecret.EMAIL_SECRET);

    var email = payload.sub;

    if (!email) {
        return handleError(res);
    }

    var users = xUser.userModel();
    users.findOne({ email: email }, (err, userFound: xUser.IUserDocument) => {
        if (err) {
            return res.status(500);
        }

        if (!userFound) {
            return handleError(res);
        }

        if (!userFound.active) {
            userFound.active = true;
        }

        userFound.save((err, userFound: xUser.IUserDocument): any => {
            if (err) {
                return res.status(500);
            }

            return res.redirect($Config.appUrl[process.env]);
        });

    });

}

function handleError(res:e.Response) {
    return res.status(401).send({
        message:"Authentication failed, enable to verify the email"
    });
}

function getHtml(token: string) {

    var model: IModel = {
        // TODO to make generic
        verifyUrl: "http://localhost:3000/auth/verifyemail?token=" + token,
        title: "psJwt",
        subTitle: "Thanks for signing up!",
        body: "Please, verify your email address by clicking the button below."
    };

    var path = "./auth/emailVerification.html";

    // TODO replace readFileSync by Async
    var html = fs.readFileSync(path, { encoding: "utf8" });

    var template = _.template(html);

    var sReturn = template(model);

    return sReturn;
}

_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};
