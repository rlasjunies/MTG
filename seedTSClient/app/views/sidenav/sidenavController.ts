module app.views.sidenav {
    "use strict";

    interface ISidenavScope {
        // isAuthenticated(): boolean; 
    }

    export class SidenavController {
        public isAuthenticated: Function;
        // public $auth:  //any; //: services.AuthToken;

        static $inject = [
            "$scope",
            "$auth",
            "$mdSidenav",
            "$log"
        ];

        constructor(
            private $scope: ng.IScope,
            private $auth,
            private $mdSidenav:any,
            private $log:ng.ILogService) {
            this.isAuthenticated = this.$auth.isAuthenticated;
            this.$log.debug("SidenavController: Constructor");

            // TODO update to use angular.value
            // $scope.$on("userupdated", (event: ng.IAngularEvent) => {
            //    this.isAuthenticated = this.$auth.isAuthenticated();
            // });
        }

        close():void{
            this.$mdSidenav("left").close().then(() => {
                    this.$log.debug("toggle left is done");
                });
        }
    }

    angular
        .module("app")
        .controller("app.views.sidenav.SidenavController", app.views.sidenav.SidenavController);
}

