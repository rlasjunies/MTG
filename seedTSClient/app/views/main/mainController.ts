module app.views.main {
    "use strict";
    export class MainController {
        static $inject = [
//            "$scope",
//            "$auth"
        ];
        constructor() {
            // private $scope: ng.IScope,
            // private $auth : satellizer.IAuthService{

            // this.$scope
            console.log("MainController: Constructor");
            // this.$auth.logout();
            // this.$rootScope.$broadcast("userupdated");
            // this.$state.go("main");

            // NotificationService.info("You are now logout!","Authentication message");

        }
    }

    angular
        .module("app")
        .controller("app.views.main.MainController", app.views.main.MainController);
}
