﻿module app.views.adm.users{
    "use strict";

    //export interface IUser {
    //    _id: string;
    //    email: string;
    //    password: string;
    //    active: boolean;
    //    googleId: string;
    //    facebookId: string;
    //    displayName: string;
    //}
    export class UsersController {
        public users: app.services.IUsers = [];
        public usersView: app.services.IUser[] = [];

        static $inject = [
            "$scope",
            "$http",
            "CST_API_URL",
            "NotificationService",
            "$log",
            "$mdDialog",
            "$filter",
            "$state",
            "UserService"
        ];
        constructor(
            private $scope: ng.IScope,
            private $http: ng.IHttpService,
            private CST_API_URL,
            private NotificationService: app.services.NotificationService,
            private $log: ng.ILogService,
            private $mdDialog,
            private $filter,
            private $state: ng.ui.IStateService,
            private UserService:app.services.IUserService) {

            //$http.get(this.CST_API_URL + app.adm.users.CST_URL_Users)
            //    .error((err) => {
            //        this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot load uers resources:");
            //        this.NotificationService.error("Error message: \n" + JSON.stringify(err), "Cannot load users resources:");
            //    })
            //    .success((users: IUser[]) => {
            //        this.users = users;
            //        this.usersView = [].concat(this.users);
            //        this.$log.debug("users loaded!");
            //    });

            this.UserService.getAll().then((users: app.services.IUsers): void => {
                this.users = users;
                this.usersView = [].concat(this.users);
                this.$log.debug("users loaded!");
            }).catch((err) => {
                this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot load uers resources:");
                this.NotificationService.error("Error message: \n" + JSON.stringify(err), "Cannot load users resources:");
            });

            //this.UserService.getAll().catch((err) => {
            //    this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot load uers resources:");
            //    this.NotificationService.error("Error message: \n" + JSON.stringify(err), "Cannot load users resources:");
            //}).then((users: app.services.IUsers):void => {
            //        this.users = users;
            //        this.usersView = [].concat(this.users);
            //        this.$log.debug("users loaded!");
            //});


                //.then((users: IUser[]) => {
                //    this.users = users;
                //    this.usersView = [].concat(this.users);
                //    this.$log.debug("users loaded!");
                //});

            this.$log.debug("UsersController: Constructor");
        }


        onClick = (userID: string): void => {
            var userParams: app.adm.users.UserRouteParams = new app.adm.users.UserRouteParams(userID);
            this.$state.go("user", userParams);
        }
    }


    angular
        .module("app")
        .controller("app.views.adm.users.UsersController", app.views.adm.users.UsersController);
}
