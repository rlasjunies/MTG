module app.config {
    "use strict";

    config.$inject = ["$locationProvider"];
    function config($locationProvider: ng.ILocationProvider): void {
        $locationProvider.html5Mode(true);
    }

    angular
        .module("app")
        .config(config);
}
