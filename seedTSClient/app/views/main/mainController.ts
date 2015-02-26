module app.views.main {
    "use strict";
    export class MainController {
        static $inject = [
            "$log",
            "$mdSidenav",
        ];
        constructor(private $log: ng.ILogService,
            private $mdSidenav: any
            ) {
            this.$log.debug("MainController: Constructor");
        }
    }

    angular
        .module("app")
        .controller("app.views.main.MainController", app.views.main.MainController);
}
