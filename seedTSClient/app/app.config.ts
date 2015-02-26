module app.config {
    "use strict";

    config.$inject = ["$locationProvider"];
    function config($locationProvider: ng.ILocationProvider): void {
        $locationProvider.html5Mode(true);


        console.log("window.location@config:" + window.location.protocol + "//" + window.location.host );

        //update the URL constant to be based on site URL
        //TODO Not we are passing in
        angular
            .module("app")
            .constant("CST_URL", window.location.protocol + "//" + window.location.host + "/")
            .constant("CST_API_URL", window.location.protocol + "//" + window.location.host + "/api")
            .constant("CST_AUTH_URL", window.location.protocol + "//" + window.location.host + "/auth");
    }

    angular
        .module("app")
        .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
        }]);

    angular
        .module("app")
        .config(config);
}
