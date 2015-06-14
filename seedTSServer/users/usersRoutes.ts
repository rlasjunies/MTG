import e = require("express");

import $ = require("../services/mtg");

import $usersModel = require("../models/user");
//import $authorization = require("../authorization/authorizationService");

var moduleName = "usersRoutes@";

//Create
export function create(expReq: e.xRequest<e.IRouteParamId>, expRes: e.Response, next:Function) {
    $.log.profile(moduleName + "@create");
        var user = $usersModel.userModel();
        var newUser = new user(expReq.body);
        newUser.validate(function (err: any) {
            newUser.save<$usersModel.IUserDocument>((err, user) => {
                if (err) { return expRes.status(500).write({ message: "Error writing job!" }); }

                $.log.debug(moduleName + "@create:\n" + user);
                $.log.profile(moduleName + "@create");
                return expRes.status(200).send(user);
            });
        });
};

//find
export function find(expReq: e.xRequest<e.IRouteParamId>, expRes: e.Response, next:Function) {
    $.log.profile(moduleName + "@find");
        var users: $usersModel.IUserModel = $usersModel.userModel();

        var qry = {};
        if (expReq.params.id) {
            qry = { _id: expReq.params.id };
        }

        users.find(qry,(err, user) => {
            if (err) {
                return expRes.status(500).write({ message: "Error getting jobs!" });
            }

            $.log.debug("expReq.params.id:" + expReq.params.id);
            $.log.profile(moduleName + "@find");
            expRes.status(200).send(user);
        });
    //}
};

//remove
export function remove(expReq: e.xRequest<e.IRouteParamId>, expRes: e.Response, next:Function) {
    $.log.profile(moduleName + "@remove");
    var mdlUsers: $usersModel.IUserModel = $usersModel.userModel();

    if (!expReq.params.id) {
        throw new Error("ID parameter is required!");
    }

    mdlUsers.findByIdAndRemove(expReq.params.id, (err, users) => {
        if (err) {
            return expRes.status(500).write({ message: "Error getting users!" });
        }

        $.log.profile(moduleName + "@remove");
        expRes.status(200).send(users);
    });

};

//update
export function update(expReq: e.xRequest<e.IRouteParamId>, expRes: e.Response, next:Function) {
    $.log.profile(moduleName + "@update");
    var mdlUsers: $usersModel.IUserModel = $usersModel.userModel();
    var userModel = $usersModel.userModel();
    var newUser = new userModel(expReq.body);

    if (!expReq.params.id) {
        throw new Error("Is parameter is required!");
    }

    mdlUsers.findByIdAndUpdate(expReq.params.id, expReq.body, (err, users) => {
        if (err) {
            return expRes.status(500).write({ message: "Error updating user!" });
        }

        $.log.profile(moduleName + "@update");
        expRes.status(200).send(users);
    });
};

//findMe
export function findMe(expReq: e.xRequest<e.IRouteParamId>, expRes: e.Response, next:Function) {
 let msg = `${moduleName}@findMe not implemented yet!`;
    $.log.error(msg);
    return expRes.status(500).write({ message: msg });

//         var users: $usersModel.IUserModel = $usersModel.userModel();
// 
//         var qry = {};
//         //if (expReq.params.id) {
//             qry = { _id: expReq.user.id };
//         //}
// 
//         users.find(qry,(err, user) => {
//             if (err) {
//                 return expRes.status(500).write({ message: "Error getting jobs!" });
//             }
// 
//             $.log.debug("expReq.params.id:" + expReq.params.id);
//             $.log.profile(moduleName + "@find");
//             expRes.status(200).send(user);
//         });
//     //}
};


//updateMe
export function updateMe(expReq: e.xRequest<e.IRouteParamId>, expRes: e.Response, next:Function) {
 let msg = `${moduleName}@updateMe not implemented yet!`;
    $.log.error(msg);
    return expRes.status(500).write({ message: msg });

//     $.log.profile(moduleName + "@update");
//     var mdlUsers: $usersModel.IUserModel = $usersModel.userModel();
//     var userModel = $usersModel.userModel();
//     var newUser = new userModel(expReq.body);
// 
//     if (!expReq.params.id) {
//         throw new Error("Is parameter is required!");
//     }
// 
//     mdlUsers.findByIdAndUpdate(expReq.params.id, expReq.body, (err, users) => {
//         if (err) {
//             return expRes.status(500).write({ message: "Error updating user!" });
//         }
// 
//         $.log.profile(moduleName + "@update");
//         expRes.status(200).send(users);
//     });
};