var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
var userSchema = new mongoose.Schema();
userSchema.add({
    email: String,
    password: String,
    active: Boolean,
    googleId: String,
    facebookId: String,
    displayName: String
});
userSchema.pre("save", function (next) {
    var user = this;
    if (!user.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});
userSchema.methods.comparePasswords = function (password, callback) {
    bcrypt.compare(password, this.password, callback);
};
userSchema.methods.toJSON = function () {
    var user = this.toObject();
    delete user.password;
    return user;
};
function userModel() {
    return mongoose.model("User", userSchema);
}
exports.userModel = userModel;
//# sourceMappingURL=user.js.map