module app.users{
    "use strict";

    export var usersTemplate_StringName = "app/users/users.html";
    export var usersController_StringName = "app.users.UsersController";


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
        public users: app.users.IUsers = [];
        public usersView: app.users.IUser[] = [];

        static $inject = [
            "$scope",
            "$rootScope",
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
            private $rootScope: ng.IRootScopeService,
            private $http: ng.IHttpService,
            private CST_API_URL,
            private NotificationService: app.users.NotificationService,
            private $log: ng.ILogService,
            private $mdDialog,
            private $filter,
            private $state: ng.ui.IStateService,
            private UserService: app.users.IUserService) {

            ////header definition
            this.$rootScope.headerConfiguration = new app.header.HeaderConfiguration("Users", true, false, false, false, false, false);

            this.$scope.$on("$destroy",() => {
                //clean the header bar configuration
                this.$rootScope.headerConfiguration = new app.header.HeaderConfiguration();;
            });

            this.UserService.getAll().then((users: app.users.IUsers): void => {
                this.users = users;
                this.usersView = [].concat(this.users);
                this.$log.debug("users loaded!");
            }).catch((err) => {
                this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot load users resources:");
                this.NotificationService.error("Error message: \n" + JSON.stringify(err), "Cannot load users resources:");
                });

            this.$log.debug("UsersController: Constructor");
        }

        onClick = (userID: string): void => {
            var userParams: app.adm.users.UserRouteParams = new app.adm.users.UserRouteParams(userID);
            this.$state.go("user", userParams);
        }
    }

    angular
        .module("app")
        .controller(app.users.usersController_StringName, app.users.UsersController);
}
