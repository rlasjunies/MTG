module app.main {
    "use strict";
    export var mainController_NAME: string = "app.main.MainController";

    export class MainController {
        static $inject = [
            "$log",
            "$mdSidenav",
        ];
        constructor(private $log: ng.ILogService,
            private $mdSidenav: any
            ) {
            this.$log.debug(app.main.mainController_NAME + " loaded!");
        }
    }

    angular
        .module("app")
        .controller( app.main.mainController_NAME, app.main.MainController);
}
