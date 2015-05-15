module app.logout {
    "use strict";

    export var logoutTemplate_StringName = "app/logout/logout.html";
    export var logoutController_StringName = "app.logout.LogoutController";


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

            //clean the sanitizer authentication and the app global service userLogged
            this.$auth.logout();
            this.UserLoggedService.logout();
           
            NotificationService.info("You are now logout!","Authentication message");
            this.$log.debug(app.logout.logoutController_StringName + "loaded!");
            this.$state.go(appState.mainState);
        }
    }

    angular
        .module("app")
        .controller(app.logout.logoutController_StringName, app.logout.LogoutController);
}
