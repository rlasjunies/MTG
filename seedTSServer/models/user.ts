﻿import mongoose = require("mongoose");
import bcrypt = require("bcrypt-nodejs");

// user    
export interface IUserDocument extends mongoose.Document {
    //_id: string;
    email: string;
    password: string;
    active: boolean;
    googleId: string;
    facebookId: string;
    displayName: string;
    picture: string;
    allowedRoles: string[];
    // toJSON(): void;
    //firstName: string;
    //lastName: string;
    //roles: string[];
    //timezoneOffset: number;
    //createDate?: number;
    //modifiedDate?: number;
    //socialNetworks: ISocialNetwork[];
    comparePasswords(pwd:string, callback:(err:Error,isMatching:boolean)=>{});
}

//export interface ISocialNetwork {
//    name: string;
//    username: string;
//}


//TODO duplication between UserDoc / Objects?
export interface IUserObject {
    email: string;
    password: string;
    active: boolean;
    googleId: string;
    facebookId: string;
    displayName: string;
    picture: string;
    allowedRoles: string[];
}

export interface IUserModel extends mongoose.Model<IUserDocument> {
    googleID: string;
    displayName: string;
    facebookId: string;
}

// used to extend the toJSON function
export interface IUserSchema extends mongoose.Schema {
    methods: any
}

var userSchema: IUserSchema =  <IUserSchema> new mongoose.Schema();
userSchema.add({
    email: String,
    password: String,
    active: Boolean,
    googleId: String,
    facebookId: String,
    displayName: String,
    picture: String,
    allowedRoles: [String]
});

userSchema.pre("save", function (next:Function) {
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
            return next();
        });
    });
});

userSchema.methods.comparePasswords = function (password:string, callback:(err:Error, isMatching:boolean)=>{}) {
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
