module app.users {
    "use strict";

    export var userTemplate_StringName = "app/users/user.html";
    export var userController_StringName = "app.users.UserController";

    interface IUserScope extends ng.IScope {
        userForm: any;
    }

    export class UserController {
        private user: app.services.IUser;
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
            "$mdDialog"
        ];
        constructor(
            private $scope: IUserScope,
            private $rootScope: ng.IRootScopeService,
            private $http: ng.IHttpService,
            private CST_API_URL,
            private NotificationService: app.services.NotificationService,
            private $log: ng.ILogService,
            private $stateParams: app.adm.users.IUserStateParams,
            private $mdBottomSheet: any,
            private UserService: app.services.IUserService,
            private $mdDialog: any) {

            //console.log("stateparam:" + JSON.stringify(this.$stateParams));
            if (!this.$stateParams.userId) {
                alert("UserId is missing to initialize the user detail view!");
                console.error("UserId is missing to initialize the user detail view!");
            } else {
                //userID exists

                ////header definition
                this.$rootScope.headerConfiguration = new app.header.HeaderConfiguration("User detail", false, true, false, false, true, true);

                this.$scope.$on("$destroy",() => {
                    //clean the header bar configuration
                    this.$rootScope.headerConfiguration = new app.header.HeaderConfiguration();;
                });

                //call the back end to retrieve the val
                this.UserService.getById(this.$stateParams.userId).then((user: app.services.IUser) => {
                    this.user = user;
                    this.$log.debug("user loaded!:" + JSON.stringify(users));
                }).catch((err) => {
                    this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot load uers resources:");
                    this.NotificationService.error("Error message: \n" + JSON.stringify(err), "Cannot load users resources:");
                });

                //register event functions

                //Save
                this.$scope.$on("save",() => {

                    this.UserService.update(this.user)
                        .then((user: app.services.IUser) => {
                        this.$log.debug("user saved!:" + JSON.stringify(user));
                        //this.NotificationService.info("User saved!");
                    }).catch((err) => {
                        this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot save uers resources:");
                        this.NotificationService.error("Error message: \n" + JSON.stringify(err), "Cannot save users resources:");
                    });

                    this.$rootScope.goBack();
                });

                //delete
                this.$scope.$on("delete",() => {

                    var confirm = $mdDialog.confirm()
                        .title('Confirm deletion')
                        .content('Are going to delete the user:' + this.user.displayName)
                        .ariaLabel('Lucky day')
                        .ok('Cancel')
                        .cancel('Delete');

                    //.targetEvent(ev);
                    $mdDialog.show(confirm).then(() => { },() => {
                        //$scope.alert = 'You decided to get rid of your debt.';
                        this.UserService.delete(this.$stateParams.userId)
                            .then((user: app.services.IUser) => {
                            this.$log.debug("user deleted!:" + JSON.stringify(user));
                            //this.NotificationService.info("User saved!");
                        }).catch((err) => {
                            this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot save uers resources:");
                            this.NotificationService.error("Error message: \n" + JSON.stringify(err), "Cannot save users resources:");
                        });

                        this.$rootScope.goBack();
                    });
                });

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
    }

    angular
        .module("app")
        .controller(app.users.userController_StringName, app.users.UserController);
}
