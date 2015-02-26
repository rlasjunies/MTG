module app.views.adm.users{
    "use strict";

    interface IUserScope extends ng.IScope{
        userForm: any;
    }

    export class UserController {
        private user: app.views.adm.users.IUser;
        static $inject = [
            "$scope",
            "$rootScope",
            "$http",
            "CST_API_URL",
            "NotificationService",
            "$log",
            "$stateParams",
            "$mdBottomSheet"
        ];
        constructor(
            private $scope: IUserScope,
            private $rootScope: ng.IRootScopeService,
            private $http: ng.IHttpService,
            private CST_API_URL,
            private NotificationService: app.services.NotificationService,
            private $log: ng.ILogService,
            private $stateParams: app.adm.users.IUserStateParams,
            private $mdBottomSheet:any) {

            //console.log("stateparam:" + JSON.stringify(this.$stateParams));
            if (!this.$stateParams.userId){
                alert("UserId is missing to initialize the user detail view!");
                console.error("UserId is missing to initialize the user detail view!");
            } else {
                //userID exists

                //call the back end to retrieve the val
                //TODO create user service
                $http.get(this.CST_API_URL + app.adm.users.CST_URL_Users + "/" + this.$stateParams.userId)
                    .error((err) => {
                    this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot load uers resources:");
                    this.NotificationService.error("Error message: \n" + JSON.stringify(err), "Cannot load users resources:");
                })
                    .success((users: IUser[]) => {
                    this.user = users[0];
                    this.$log.debug("user loaded!:" + JSON.stringify(users));
                });

                this.$scope.$on("save",() => {
                    $http.put(this.CST_API_URL + app.adm.users.CST_URL_Users + "/" + this.user._id, this.user).error((err) => {
                            this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot save uers resources:");
                            this.NotificationService.error("Error message: \n" + JSON.stringify(err), "Cannot save users resources:");
                        }).success((users: IUser[]) => {
                            this.user = users[0];
                            this.$log.debug("user saved!:" + JSON.stringify(users));
                            this.NotificationService.info("User saves!");
                    });

                    this.$rootScope.goBack();
                });

                this.$scope.$watch(() => this.$scope.userForm.$invalid,(newValue, oldValue) => {
                    console.log("watch [" + newValue + "] -> [" + oldValue + "]");
                    if (newValue) {
                        this.$scope.$emit("invalid");
                    }else{
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
