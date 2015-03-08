﻿module app.views.sidenav {
    "use strict";

    interface ISidenavScope {
        // isAuthenticated(): boolean; 
    }

    export class SidenavController {
        // public isAuthenticated: Function;
        // public $auth:  //any; //: services.AuthToken;

        static $inject = [
            "$scope",
            "$auth",
            "$mdSidenav",
            "$log",
            "UserLoggedService"
        ];

        constructor(
            private $scope: ng.IScope,
            private $auth,
            private $mdSidenav:any,
            private $log: ng.ILogService,
            private UserLoggedService: app.services.IUserLoggedService) {

            this.$log.debug("SidenavController: Constructor");

        }

        close():void{
            this.$mdSidenav("left").close().then(() => {
                    //this.$log.debug("toggle left is done@sideNavController");
                });
        }
    }

    angular
        .module("app")
        .controller("app.views.sidenav.SidenavController", app.views.sidenav.SidenavController);
}

