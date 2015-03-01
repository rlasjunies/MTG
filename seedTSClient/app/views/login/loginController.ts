module app.views.login {
    "use strict";

    export interface ILogin {
        submit: () => void;
    };

    interface ILoginRootSCope extends ng.IRootScopeService {
        //USER_ISAUTHENTICATED: boolean;
        //USER_DISPLAYNAME: string;
        //USER_EMAIL: string;
        USER_LOGGED: app.services.IUser;
    }

    export class LoginController implements register.IController {
        public email: string;
        public password: string;

        static $inject = [
            "$rootScope",
            "NotificationService",
            "$state",
            "$auth",
            "$log"
        ];
        constructor (
            private $rootScope: ILoginRootSCope,
            private NotificationService: app.services.NotificationService,
            private $state: ng.ui.IStateService,
            private $auth: satellizer.IAuthService,
            private $log:ng.ILogService) {
            this.$log.debug("LoginController: Constructor");
        }

        submit = () => {
            this.$auth.login<app.authentication.IAuthenticationServerResponse>({ email: this.email, password: this.password })
                .then((response) => {
                    var msg = "Thanks '" + response.data.user.email + "' for coming back!";
                    this.$log.debug(msg);                    
                    this.NotificationService.success(msg);

                    //this.$rootScope.$broadcast("userupdated");
                    //this.$rootScope.USER_DISPLAYNAME = response.data.user.displayName;
                    //this.$rootScope.USER_EMAIL = response.data.user.email;
                    //this.$rootScope.USER_ISAUTHENTICATED = true;
                    this.$rootScope.USER_LOGGED = response.data.user;

                    if (!response.data.user.active) {
                        msg = "Do not forget to active your account via the email sent!";
                        this.NotificationService.warning(msg);
                    }

                    this.$state.go("main");
                })
                .catch((err) => {
                    this.$log.error("login:" + JSON.stringify(err));
                    this.NotificationService.error("Error registering!" + JSON.stringify(err));

                    //this.$rootScope.$broadcast("userupdated");
                    //this.$rootScope.USER_DISPLAYNAME = "";
                    //this.$rootScope.USER_EMAIL = "";
                    //this.$rootScope.USER_ISAUTHENTICATED = false;
                    this.$rootScope.USER_LOGGED = null;
                });
        }

        authenticate = (provider:string) => {
            this.$auth.authenticate<app.authentication.IAuthenticationServerResponse>(provider).then((response) => {

                var msg = "Thanks '" + response.data.user.email + "' for coming back!";
                this.$log.debug(msg);
                this.NotificationService.success(msg);
                //this.$rootScope.$broadcast("userupdated");
                //this.$rootScope.USER_DISPLAYNAME = response.data.user.displayName;
                //this.$rootScope.USER_EMAIL = response.data.user.email;
                //this.$rootScope.USER_ISAUTHENTICATED = true;
                this.$rootScope.USER_LOGGED = response.data.user;
                this.$state.go("main");
            }).catch((err) => {
                this.$log.error("login:" + JSON.stringify(err));
                this.NotificationService.error("Error registering!");
                //this.$rootScope.$broadcast("userupdated");
                //this.$rootScope.USER_DISPLAYNAME = "";
                //this.$rootScope.USER_EMAIL = "";
                //this.$rootScope.USER_ISAUTHENTICATED = false;
                this.$rootScope.USER_LOGGED = null;
                });
        };
    }

    angular
        .module("app")
        .controller("app.views.login.LoginController", app.views.login.LoginController);
}
