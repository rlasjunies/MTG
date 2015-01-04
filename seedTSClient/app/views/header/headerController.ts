module app.views.header {
    "use strict";

    interface IHeaderScope {
        // isAuthenticated(): boolean; 
    }

    export class HeaderController {
        public isAuthenticated: Function;
        // public $auth:  //any; //: services.AuthToken;

        static $inject = [
            "$scope",
            "$auth"
        ];
        constructor(
            private $scope: ng.IScope,
            private $auth) {
            this.isAuthenticated = this.$auth.isAuthenticated;
            console.log("HeaderController: Constructor");

            // TODO update to use angular.value
            // $scope.$on("userupdated", (event: ng.IAngularEvent) => {
            //    this.isAuthenticated = this.$auth.isAuthenticated();
            // });

        }
    }

    angular
        .module("app")
        .controller("app.views.header.HeaderController", app.views.header.HeaderController);
}

