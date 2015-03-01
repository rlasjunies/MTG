module app.views.adm.users {
    "use strict";

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
            private userService: app.services.IUserService,
            private $mdDialog: any) {

            //console.log("stateparam:" + JSON.stringify(this.$stateParams));
            if (!this.$stateParams.userId) {
                alert("UserId is missing to initialize the user detail view!");
                console.error("UserId is missing to initialize the user detail view!");
            } else {
                //userID exists

                //call the back end to retrieve the val
                this.userService.getById(this.$stateParams.userId).then((user: app.services.IUser) => {
                    this.user = user;
                    this.$log.debug("user loaded!:" + JSON.stringify(users));
                }).catch((err) => {
                    this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot load uers resources:");
                    this.NotificationService.error("Error message: \n" + JSON.stringify(err), "Cannot load users resources:");
                });


                //register event functions

                //Save
                this.$scope.$on("save",() => {

                    this.userService.update(this.user)
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
                        this.userService.delete(this.$stateParams.userId)
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

                this.$scope.$watch(() => this.$scope.userForm.$invalid,(newValue, oldValue) => {
                    console.log("watch [" + newValue + "] -> [" + oldValue + "]");
                    if (newValue) {
                        this.$scope.$emit("invalid");
                    } else {
                        this.$scope.$emit("valid");
                    }
                });
            }


            this.$log.debug("UserController: Constructor");
        }
    }

    angular
        .module("app")
        .controller("app.views.adm.users.UserController", app.views.adm.users.UserController);
}
