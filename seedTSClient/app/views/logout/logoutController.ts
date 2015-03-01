module app.views.logout {
    "use strict";

    interface ILogoutRootSCope extends ng.IRootScopeService {
        //USER_ISAUTHENTICATED: boolean;
        //USER_DISPLAYNAME: string;
        //USER_EMAIL: string;
        USER_LOGGED: app.services.IUser;
    }

    export class LogoutController {
        static $inject = [
            "$rootScope",
            "$auth",
            "$state",
            "NotificationService",
            "$log"
        ];
        constructor(
            private $rootScope: ILogoutRootSCope,
            private $auth : satellizer.IAuthService,
            private $state: ng.ui.IStateService,
            private NotificationService: app.services.NotificationService,
            private $log: ng.ILogService) {

            this.$log.debug("LogoutController: Constructor");

            this.$auth.logout();
            //this.$rootScope.$broadcast("userupdated");
           
            NotificationService.info("You are now logout!","Authentication message");
            this.$log.debug("LogoutController: Constructor");
            //this.$rootScope.USER_DISPLAYNAME = "";
            //this.$rootScope.USER_EMAIL = "";
            //this.$rootScope.USER_ISAUTHENTICATED = false;
            this.$rootScope.USER_LOGGED = null;
            this.$state.go("main");
        }
    }

    angular
        .module("app")
        .controller("app.views.logout.LogoutController", app.views.logout.LogoutController);
}
