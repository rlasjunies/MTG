module app.header {
    "use strict";

    export var headerAddTemplate_StringName = "app/views/headerAdd/headerAdd.html";
    export var headerAddController_StringName = "app.header.AddController";

    interface IHeaderScope {
        // isAuthenticated(): boolean; 
    }

    export class HeaderAddController {
        static $inject = [
            "$scope",
            "$rootScope",
            "$log"
        ];
        constructor(
            private $scope: ng.IScope,
            private $rootScope: ng.IScope,
            private $log: ng.ILogService) {

            this.$log.debug(headerAddController_StringName + " loaded!");
        }
    }

    angular
        .module("app")
        .controller(headerAddController_StringName, app.header.HeaderAddController);
}

