var $ = require("../../services/mtg");
var $usersModel = require("../../models/user");
var moduleName = "usersRoutes@";
//Create
function create(expReq, expRes, next) {
    $.log.profile(moduleName + "@create");
    var user = $usersModel.userModel();
    var newUser = new user(expReq.body);
    newUser.validate(function (err) {
        newUser.save(function (err, user) {
            if (err) {
                return expRes.status(500).write({ message: "Error writing job!" });
            }
            $.log.debug(moduleName + "@create:\n" + user);
            $.log.profile(moduleName + "@create");
            return expRes.status(200).send(user);
        });
    });
}
exports.create = create;
;
//find
function find(expReq, expRes, next) {
    $.log.profile(moduleName + "@find");
    var users = $usersModel.userModel();
    var qry = {};
    if (expReq.params.id) {
        qry = { _id: expReq.params.id };
    }
    users.find(qry, function (err, user) {
        if (err) {
            return expRes.status(500).write({ message: "Error getting jobs!" });
        }
        $.log.debug("expReq.params.id:" + expReq.params.id);
        $.log.profile(moduleName + "@find");
        expRes.status(200).send(user);
    });
    //}
}
exports.find = find;
;
//remove
function remove(expReq, expRes, next) {
    $.log.profile(moduleName + "@remove");
    var mdlUsers = $usersModel.userModel();
    if (!expReq.params.id) {
        throw new Error("ID parameter is required!");
    }
    mdlUsers.findByIdAndRemove(expReq.params.id, function (err, users) {
        if (err) {
            return expRes.status(500).write({ message: "Error getting users!" });
        }
        $.log.profile(moduleName + "@remove");
        expRes.status(200).send(users);
    });
}
exports.remove = remove;
;
//update
function update(expReq, expRes, next) {
    $.log.profile(moduleName + "@update");
    var mdlUsers = $usersModel.userModel();
    var userModel = $usersModel.userModel();
    var newUser = new userModel(expReq.body);
    if (!expReq.params.id) {
        throw new Error("Is parameter is required!");
    }
    mdlUsers.findByIdAndUpdate(expReq.params.id, expReq.body, function (err, users) {
        if (err) {
            return expRes.status(500).write({ message: "Error updating user!" });
        }
        $.log.profile(moduleName + "@update");
        expRes.status(200).send(users);
    });
}
exports.update = update;
;
//# sourceMappingURL=usersRoutes.js.map