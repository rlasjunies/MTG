import mongoose = require("mongoose");
import bcrypt = require("bcrypt-nodejs");

// user    
export interface IUserDocument extends mongoose.Document {
    _id: string;
    email: string;
    password: string;
    active: boolean;
    googleId: string;
    facebookId: string;
    displayName: string;
    // toJSON(): void;
    comparePasswords(pwd, callback);
}

export interface IUserModel extends mongoose.Model<IUserDocument> {
    googleID: string;
    displayName: string;
    facebookId: string;
}

// used to extend the toJSON function
export interface ISchemaUser extends mongoose.Schema {
    methods: any
}

var userSchema: ISchemaUser =  <ISchemaUser> new mongoose.Schema();
userSchema.add({
    email: String,
    password: String,
    active: Boolean,
    googleId: String,
    facebookId: String,
    displayName: String
});

userSchema.pre("save", function (next) {
    var user: IUserDocument = this;

    if (!user.isModified("password")) {
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, null, (err, hash) => {
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

export function userModel(): IUserModel {
    return <IUserModel>mongoose.model<IUserDocument>("User", userSchema);
}
