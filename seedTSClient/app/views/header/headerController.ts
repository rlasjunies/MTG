module app.views.header {
    "use strict";

    interface IHeaderScope {
        // isAuthenticated(): boolean; 
    }

    export class HeaderController {
        //public isAuthenticated: Function;
        // public $auth:  //any; //: services.AuthToken;

        static $inject = [
            "$scope",
            "$auth",
            "$log"
        ];
        constructor(
            private $scope: ng.IScope,
            private $auth: satellizer.IAuthService,
            private $log:ng.ILogService) {
            this.isAuthenticated = this.$auth.isAuthenticated;
            this.$log.debug("HeaderController: Constructor");
        }

        isAuthenticated = ():boolean => {
            return this.$auth.isAuthenticated();
        }
    }

    angular
        .module("app")
        .controller("app.views.header.HeaderController", app.views.header.HeaderController);
}

