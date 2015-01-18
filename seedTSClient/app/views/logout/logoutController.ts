module app.views.logout {
    "use strict";
    export class LogoutController {
        static $inject = [
            "$rootScope",
            "$auth",
            "$state",
            "NotificationService",
            "$log"
        ];
        constructor(
            private $rootScope: ng.IScope,
            private $auth : satellizer.IAuthService,
            private $state: ng.ui.IStateService,
            private NotificationService: app.services.NotificationService,
            private $log: ng.ILogService) {

            this.$auth.logout();
            this.$rootScope.$broadcast("userupdated");
            this.$state.go("main");

            NotificationService.info("You are now logout!","Authentication message");
            this.$log.debug("LogoutController: Constructor");
        }
    }

    angular
        .module("app")
        .controller("app.views.logout.LogoutController", app.views.logout.LogoutController);
}
