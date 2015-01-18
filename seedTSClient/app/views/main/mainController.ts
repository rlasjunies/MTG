module app.views.main {
    "use strict";
    export class MainController {
        static $inject = [
//            "$scope",
//            "$auth",
            "$log"
        ];
        constructor(private $log:ng.ILogService) {
            // private $scope: ng.IScope,
            // private $auth : satellizer.IAuthService{

            // this.$scope
            this.$log.debug("MainController: Constructor");
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
