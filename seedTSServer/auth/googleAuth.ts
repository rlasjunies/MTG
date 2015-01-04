import express = require("express");
// import mongoose = require("mongoose");

import ts = require("./google.typesafe");

import libRequest = require("request");
import libUser = require("../models/user");
import libToken = require("./token");
import libConfig = require("../services/config");

interface IGoogleProfile {
    sub: string; // GoogleID
    name: string;
}

// TODO how to define an interface more precise
// We need to define IGoogleProfile as return of this requestGet

// export interface request {//extends request.RequestAPI{
//     	//function post(options: Options, callback?: (error: any, response: any, body: any) => void): Request;
// 		function get(options: request.Options, callback?: (error: any, response: any, body: IGoogleProfile) => void): Request;
// }

export function googleAuth(expReq: express.Request, expRes: express.Response) {
    var tsBody = <ts.IAuthGoogleBody>expReq.body;
    console.log(tsBody.code);

    var opt: libRequest.Options = {
        url: "https://accounts.google.com/o/oauth2/token",
        json: true,
        form: {
            code: tsBody.code,
            client_id: tsBody.clientId,
            redirect_uri: tsBody.redirectUri,
            grant_type: "authorization_code",
            client_secret: libConfig.GOOGLE_SECRET
        }
    };

    libRequest.post(opt, (err, response, token) => {
        console.log("\ngoogleAuth - token: " + JSON.stringify(token));
        if (err) {
            throw err;
        }


        var accessToken = token.access_token;
        var headers: libRequest.Headers = {};
        headers["Authorization"] = "Bearer " + accessToken;

        var requestParams: libRequest.Options = {};
        requestParams.url = "https://www.googleapis.com/plus/v1/people/me/openIdConnect";
        requestParams.headers = headers;
        requestParams.json = true;
        libRequest.get(requestParams, (err, response, profile: IGoogleProfile) => {
            console.log("\ngoogleAuth:" + err + response + JSON.stringify(profile));
            if (err) {
                throw err;
            }

            var userModel = libUser.userModel();

            userModel.findOne({
                googleId: profile.sub
            }, (err, foundUser) => {
                    if (foundUser) {
                        return libToken.createSendToken(foundUser, expRes);
                    }

                    var userModel = libUser.userModel();

                    var userDoc: libUser.IUserDocument = new userModel({});

                    userDoc.id = profile.sub;
                    userDoc.displayName = profile.name;

                    userDoc.save((err) => {
                        // if (err) return next(err);
                        if (err) {
                            throw err;
                        }
                        libToken.createSendToken(userDoc, expRes);
                    });
                });
        });
    });

    // res.status(200).send({ message: "fine!" });
}
