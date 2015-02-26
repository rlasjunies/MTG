module app.config.auth {
    "use strict";
    config.$inject = [
        "$authProvider",
        "$locationProvider"
    ];
    function config($authProvider, $locationProvider:ng.ILocationProvider) {

        //I do not succeed to inject the CST_AUTH_URL :-(
        var urlAuth : string = window.location.protocol + "//" + window.location.host + "/auth";

        console.log("urlAuth" + urlAuth);

        $authProvider.google({
            clientId: "149876745472-k3ubq3pbtll17pmuohdjfom0fpinklmc.apps.googleusercontent.com",
            url: urlAuth + "/google",
        });

        $authProvider.facebook({
            clientId: "1608138689408302",
            url: urlAuth + "/facebook",
        });

        $authProvider.loginUrl = urlAuth + "/login";
        $authProvider.signupUrl = urlAuth + "/register";
    }

    angular
        .module("app")
        .config(config);
}
