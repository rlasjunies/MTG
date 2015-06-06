module app.users {
    "use strict";

    export var userTemplate_StringName = "app/users/user.html";
    export var userController_StringName = "app.users.UserController";

    interface IUserScope extends ng.IScope {
        userForm: any;
    }

    interface IUIRole {
        code: string;
        allowed: boolean;
    }

    export class UserController {
        private user: app.users.IUser;
        public UIRoles: IUIRole[] = [];

        static $inject = [
            "$scope",
            "$rootScope",
            "$http",
            "CST_API_URL",
            "NotificationService",
            "$log",
            "$stateParams",
            "$mdBottomSheet",
            "UserService",
            "AuthorizationService",
            "$mdDialog",
            "$q"
        ];
        constructor(
            private $scope: IUserScope,
            private $rootScope: ng.IRootScopeService,
            private $http: ng.IHttpService,
            private CST_API_URL,
            private NotificationService: app.users.NotificationService,
            private $log: ng.ILogService,
            private $stateParams: app.adm.users.IUserStateParams,
            private $mdBottomSheet: any,
            private UserService: app.users.IUserService,
            private AuthorizationService: app.authorization.IAuthorizationService,
            private $mdDialog: any,
            private $q: ng.IQService) {

            //console.log("stateparam:" + JSON.stringify(this.$stateParams));
            if (!this.$stateParams.userId) {
                var msg = "UserId is missing to initialize the user detail view!"; 
                alert(msg);
                console.error(msg);
            } else {
                //userID exists

                ////header definition
                this.$rootScope.headerConfiguration = new app.header.HeaderConfiguration("User detail", false, true, false, false, true, true);

                this.$scope.$on("$destroy",() => {
                    //clean the header bar configuration
                    this.$rootScope.headerConfiguration = new app.header.HeaderConfiguration();;
                });

                //call the back end to retrieve the val
                this.UserService.getById(this.$stateParams.userId).then((user: app.users.IUser) => {
                    this.user = user;
                    this.$log.debug("user loaded!:" + JSON.stringify(this.user));
                }).then(() => {
                    this.loadRoles();
                    }).catch((err) => {
                    var msg = "Error message: \n" + JSON.stringify(err) + "\nCannot load uers resources:";
                    this.$log.error(msg);
                    this.NotificationService.error(msg);
                });

                //register event functions

                //Save
                this.$scope.$on("save",this.saveUSer);

                //delete
                this.$scope.$on("delete", this.deleteUser);

                //Raise event to the app when the form is invalid
                this.$scope.$watch(() => this.$scope.userForm.$invalid,(newValue, oldValue) => {
                    //console.log("watch [" + newValue + "] -> [" + oldValue + "]");
                        if (newValue) {
                            this.$scope.$emit(appRootScopeEvent.invalidForm);
                        } else {
                            this.$scope.$emit(appRootScopeEvent.validForm);
                        }
                    });
            }

            this.$log.debug("UserController: Constructor");
        }

        allowRole = (role: IUIRole) => {
            if (role.allowed) {
                this.AuthorizationService.addRole(this.user.allowedRoles, role.code);
                this.$log.info("role:" + role.code + " selected: allowed");
            } else {
                this.AuthorizationService.removeRole(this.user.allowedRoles, role.code);
                this.$log.info("role:" + role.code + " selected: NOT allowed");
            }

        }

        saveUSer = () => {
            this.UserService.update(this.user)
                .then((user: app.users.IUser) => {
                this.$log.debug("user saved!:" + JSON.stringify(user));
                //this.NotificationService.info("User saved!");
            }).catch((err) => {
                this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot save uers resources:");
                this.NotificationService.error("Error message: \n" + JSON.stringify(err), "Cannot save users resources:");
            });

            this.$rootScope.goBack();
        };

        deleteUser = () => {
            var confirm = this.$mdDialog.confirm()
                .title('Confirm deletion')
                .content('You are going to delete the user:' + this.user.displayName)
                .ariaLabel('Lucky day')
                .ok('Cancel')
                .cancel('Delete');

            //.targetEvent(ev);
            this.$mdDialog.show(confirm).then(() => { },() => {
                //$scope.alert = 'You decided to get rid of your debt.';
                this.UserService.delete(this.$stateParams.userId)
                    .then((user: app.users.IUser) => {
                    this.$log.debug("user deleted!:" + JSON.stringify(user));
                    //this.NotificationService.info("User saved!");
                }).catch((err) => {
                    this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot save uers resources:");
                    this.NotificationService.error("Error message: \n" + JSON.stringify(err), "Cannot save users resources:");
                });

                this.$rootScope.goBack();
            });
        };

        loadRoles = () => {
            this.AuthorizationService.getAllRoles().then((roles: app.authorization.IRole[]): void => {
                this.$log.debug("roles loaded!");
                this.user.allowedRoles = this.user.allowedRoles === undefined ? [] : this.user.allowedRoles;

                for (var i = 0; i < roles.length; i++) {
                    this.UIRoles.push({
                        allowed: this.AuthorizationService.hasGotRole(this.user.allowedRoles, roles[i].id),
                        code: roles[i].id,
                    });
                }
            }).catch((err: Error) => {
                this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot load roles resources:");
                this.NotificationService.error("Error message: \n" + JSON.stringify(err), "Cannot load roles resources:");
            });
        }

    }

    angular
        .module("app")
        .controller(app.users.userController_StringName, app.users.UserController);
}
