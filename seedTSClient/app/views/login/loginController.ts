module app.views.login {
    "use strict";

    export interface ILogin {
        submit: () => void;
    };

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
            private $rootScope: ng.IScope,
            private NotificationService: app.services.NotificationService,
            private $state: ng.ui.IStateService,
            private $auth: satellizer.IAuthService,
            private $log:ng.ILogService) {
            this.$log.debug("LoginController: Constructor");
        }

        submit = () => {
            this.$auth.login<app.authentication.IAuthenticationServerResponse>({ email: this.email, password: this.password })
                .then((response) => {
                    this.$log.debug("login is fine!");

                    var msg = "Thanks '" + response.data.user.email + "'for coming back!";
                    this.NotificationService.success(msg);

                    if (!response.data.user.active) {
                        msg = "Do not forget to active your account via the email sent!";
                        this.NotificationService.warning(msg);
                    }

                    this.$rootScope.$broadcast("userupdated");
                    this.$state.go("main");
                })
                .catch((err) => {
                    this.$log.error("login:" + JSON.stringify(err));
                    this.NotificationService.error("Error registering!");
                    this.$rootScope.$broadcast("userupdated");
                });
        }

        authenticate = (provider:string) => {
            this.$auth.authenticate<app.authentication.IAuthenticationServerResponse>(provider).then((response) => {
                this.$log.debug("login is fine!");
                this.NotificationService.success("U are logged!");
                this.$rootScope.$broadcast("userupdated");
                this.$state.go("main");
            }).catch((err) => {
                    this.$log.error("login:" + JSON.stringify(err));
                    this.NotificationService.error("Error registering!");
                this.$rootScope.$broadcast("userupdated");
            });
        };
    }

    angular
        .module("app")
        .controller("app.views.login.LoginController", app.views.login.LoginController);
}
