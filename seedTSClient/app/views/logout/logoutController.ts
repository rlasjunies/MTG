module app.views.logout {
    "use strict";

    interface ILogoutRootSCope extends ng.IRootScopeService {
    }

    export class LogoutController {
        static $inject = [
            "$rootScope",
            "$auth",
            "$state",
            "NotificationService",
            "$log",
            "UserLoggedService"
        ];
        constructor(
            private $rootScope: ILogoutRootSCope,
            private $auth : satellizer.IAuthService,
            private $state: ng.ui.IStateService,
            private NotificationService: app.services.NotificationService,
            private $log: ng.ILogService,
            private UserLoggedService:app.services.IUserLoggedService) {

            this.$log.debug("LogoutController: Constructor");

            //clean the sanitizer authentication and the app global service userLogged
            this.$auth.logout();
            this.UserLoggedService.logout();
           
            NotificationService.info("You are now logout!","Authentication message");
            this.$log.debug("LogoutController: Constructor");
            this.$state.go("main");
        }
    }

    angular
        .module("app")
        .controller("app.views.logout.LogoutController", app.views.logout.LogoutController);
}
