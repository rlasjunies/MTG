module app.views.login {
    "use strict";

    export interface ILogin {
        submit: () => void;
    };

    interface ILoginRootSCope extends ng.IRootScopeService {
    }

    export class LoginController implements register.IController {
        public email: string;
        public password: string;

        static $inject = [
            "$rootScope",
            "$scope",
            "NotificationService",
            "$state",
            "$auth",
            "$log",
            "UserLoggedService"
        ];
        constructor (
            private $rootScope: ILoginRootSCope,
            private $scope: ng.IScope,
            private NotificationService: app.services.NotificationService,
            private $state: ng.ui.IStateService,
            private $auth: satellizer.IAuthService,
            private $log: ng.ILogService,
            private UserLoggedService: app.services.IUserLoggedService) {
            this.$log.debug("LoginController: Constructor");

            this.$rootScope.headerTitle = "";

            this.$scope.$on("$destroy",() => {
                this.$rootScope.headerTitle = "";
            });
        }

        submit = () => {
            this.$auth.login<app.authentication.IAuthenticationServerResponse>({ email: this.email, password: this.password })
                .then((response) => {
                    //Initialize the logged user
                    this.UserLoggedService.login(response.data.user);

                    //Welcome back the user
                    var msg = "Thanks '" + response.data.user.email + "' for coming back!";
                    this.$log.debug(msg);
                    this.NotificationService.success(msg);

                    //Notify if the user is not activated
                    if (!this.UserLoggedService.active) {
                        msg = "Do not forget to active your account via the email sent!";
                        this.NotificationService.warning(msg);
                    }
                    
                    //Navigate to the main page
                    this.$state.go("main");
                })
                .catch((err) => {
                    this.$log.error("login:" + JSON.stringify(err));
                    this.NotificationService.error("Error registering!" + JSON.stringify(err));

                    //clean the user logged
                    this.UserLoggedService.logout();
                })
        }

        authenticate = (provider:string) => {
            this.$auth.authenticate<app.authentication.IAuthenticationServerResponse>(provider).then((response) => {

                //initialize the user logged
                this.UserLoggedService.login(response.data.user);

                 //Welcome back the user
                var msg = "Thanks '" + response.data.user.email + "' for coming back!";
                this.$log.debug(msg);
                this.NotificationService.success(msg);
                
                //Navigate to the main page
                this.$state.go("main");
            }).catch((err) => {
                this.$log.error("login:" + JSON.stringify(err));
                this.NotificationService.error("Error registering!");

                //clean the user logged
                this.UserLoggedService.logout();
                });
        };
    }

    angular
        .module("app")
        .controller("app.views.login.LoginController", app.views.login.LoginController);
}
