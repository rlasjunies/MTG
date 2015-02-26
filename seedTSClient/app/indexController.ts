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
            private $mdSidenav: ng.material.ISideBar,
            private $log: ng.ILogService) {
            this.isAuthenticated = this.$auth.isAuthenticated;
            this.$log.debug("IndexController: Constructor");
            //this.isAuthenticated = this.$auth.isAuthenticated();

             //$scope.$on("userupdated", (event: ng.IAngularEvent) => {
             //   this.isAuthenticated = this.$auth.isAuthenticated;
             //});

            // TODO update to use angular.value
            // $scope.$on("userupdated", (event: ng.IAngularEvent) => {
            //    this.isAuthenticated = this.$auth.isAuthenticated();
            // });
        }

        toggleLeft  = (): void => {
            this.$mdSidenav("left").toggle().then(()=>{
                //this.$log.debug("toggle left is done");
            });
        }

        //Open Left SideNav if MainPage SwipeRight
        onSwipeRight = (): void => {
            //if (this.$mdSidenav("left").isOpen()) {
                //nothing
            //}else{
                this.$mdSidenav("left").open();
            //}
        }

        //Close Left SideNav if MainPage SwipeLeft
        onSwipeLeft = (): void => {
            //if (this.$mdSidenav("left").isOpen()) {
                this.$mdSidenav("left").close();
            //} else {
                //nothing
            //}
        }

    }

    angular
        .module("app")
        .controller("app.views.index.IndexController", app.views.index.IndexController);
}

