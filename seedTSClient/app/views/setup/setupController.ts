module app.views.setup {
    "use strict";

    interface ISetupScope extends ng.IScope {
    }

    export class setupController {

        static $inject = [
            "$log",
            "$mdSidenav",
            "$scope",
            "$animate",
            "$compile"
        ];
        constructor(private $log: ng.ILogService,
            private $mdSidenav: any,
            private $scope: ISetupScope,
            private $animate: ng.IAnimateService,
            private $compile:ng.ICompileService
            ) {
            this.$log.debug("dndController: Constructor");
        }
    }

    angular
        .module("app")
        .controller("app.views.setup.setupController", app.views.setup.setupController);
}
