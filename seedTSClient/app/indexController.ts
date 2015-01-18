module app.views.index {
    "use strict";

    interface IIndexScope {
        // isAuthenticated(): boolean; 
    }

    export class IndexController {
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
            private $mdSidenav: any,
            private $log: ng.ILogService) {
            this.isAuthenticated = this.$auth.isAuthenticated;
            console.log("IndexController: Constructor");

            // TODO update to use angular.value
            // $scope.$on("userupdated", (event: ng.IAngularEvent) => {
            //    this.isAuthenticated = this.$auth.isAuthenticated();
            // });
        }

        toggleLeft  = (): void => {
            this.$mdSidenav("left").toggle().then(()=>{
                this.$log.debug("toggle left is done");
            });
        }

        toggleRight = (): void=> {
            this.$mdSidenav("right").toggle().then(() => {
                this.$log.debug("toggle RIGHT is done");
            });
        }
    }

    angular
        .module("app")
        .controller("app.views.index.IndexController", app.views.index.IndexController);
}

