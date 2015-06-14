module app.users {
    "use strict";
    export var userService_StringName = "UserService";

    export interface IUserService {
        getById(uniqueId: string): ng.IPromise<IUser>;
        getMe():ng.IPromise<IUser>;
        getAll(): ng.IPromise<IUsers>;
        update(user: IUser): ng.IPromise<IUser>;
        updateMe(user: IUser): ng.IPromise<IUser>;
        delete(uniqueId:string): ng.IPromise<IUser>;
    }

    //export class AllowedAccessRights{
    //    [key:string]:boolean;
    //} 

    export interface IUser {
        _id: string;
        email: string;
        displayName: string;
        picture: string;
        active: boolean;
        //allowedRoles: app.authorization.IRole[];
        allowedRoles: string[];
    }

    export interface IUsers {
        [index: number]:IUser;
    }

    class UserService implements IUserService {
        static $inject = ["$http"];
        constructor(private $http: ng.IHttpService) {
        }

		getMe(): ng.IPromise<IUser> {
            return this.$http.get("/api/adm/users/me" + uniqueId)
                .then((response: ng.IHttpPromiseCallbackArg<IUser>): IUser => {
                    return <IUser>response.data[0];
                });
        }

        getById(uniqueId: string): ng.IPromise<IUser> {
            return this.$http.get("/api/adm/users/" + uniqueId)
                .then((response: ng.IHttpPromiseCallbackArg<IUser>): IUser => {
                    return <IUser>response.data[0];
                });
        }

        getAll(): ng.IPromise<IUsers> {
            return this.$http.get("/api/adm/users/")
                .then((response: ng.IHttpPromiseCallbackArg<IUsers>): IUsers => {
                    return <IUsers>response.data;
            });
        }

        update(user:IUser): ng.IPromise<IUser>{
            return this.$http.put("/api/adm/users/" + user._id, user).then((response: ng.IHttpPromiseCallbackArg<IUser>): IUser => {
                return <IUser> response.data;
            });
        }

        updateMe(user:IUser): ng.IPromise<IUser>{
            return this.$http.put("/api/adm/users/me", user).then((response: ng.IHttpPromiseCallbackArg<IUser>): IUser => {
                return <IUser> response.data;
            });
        }

        delete(uniqueId:string): ng.IPromise<IUser> {
            return this.$http.delete("/api/adm/users/" + uniqueId).then((response: ng.IHttpPromiseCallbackArg<IUser>): IUser => {
                return <IUser> response.data;
            });
        }

    }

    angular
        .module("app")
        .service(app.users.userService_StringName, UserService);
}