module app.views.register {
    "use strict";

    export interface IController {
        submit: () => void;
    };

    export class RegisterController implements register.IController {
        public email: string;
        public password: string;
        public passwordConfirm: string;

        static $inject = [
            "$rootScope",
            "$scope",
            "NotificationService",
            "$auth",
            "$state",
            "$log"
        ];
        constructor(
            private $rootScope: ng.IScope,
            private $scope: ng.IScope,
            private NotificationService: app.services.NotificationService,
            private $auth : satellizer.IAuthService,
            private $state: ng.ui.IStateService,
            private $log:ng.ILogService) {

            this.password = "";
            this.passwordConfirm = "";

            this.$scope.$watch(() => this.password, this.checkPasswords);
            this.$scope.$watch(() => this.passwordConfirm, this.checkPasswords);

            this.$log.debug("RegisterController: Constructor");
        }

        checkPasswords = () => {
            this.$scope["register"]["password_confirm"].$setValidity("equal", (this.password === this.passwordConfirm));
        }

        submit = () => {
            this.$auth.signup<app.authentication.IAuthenticationServerResponse>({ email: this.email, password: this.password })
                .then((response) => {
                    this.$log.info("registration is fine!"); 

                    var msg = "Dear '" + response.data.user.email +
                        "' you are now registered!. Goes in your mailbox to confirm your email address " +
                        " within 12 hours.";
                    this.NotificationService.success(msg);
                    this.$scope.$broadcast("userupdated");
                    this.$state.go("main");
                })
                .catch((err) => {
                    this.$log.error("registration is wrong bad:" + JSON.stringify(err));
                    this.NotificationService.error("Error registering!" + JSON.stringify( err));
                    this.$scope.$broadcast("userupdated");
                });
        };
    }

    angular
        .module("app")
        .controller("app.views.register.RegisterController", app.views.register.RegisterController);
}
