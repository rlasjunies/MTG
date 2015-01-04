module app.config.auth {
    "use strict";
    config.$inject = [
        "$authProvider",
        "CST_AUTH_URL"
    ];
    function config($authProvider, CST_AUTH_URL) {

        $authProvider.google({
            clientId: "149876745472-k3ubq3pbtll17pmuohdjfom0fpinklmc.apps.googleusercontent.com",
            url: CST_AUTH_URL + "/google",
        });

        $authProvider.facebook({
            clientId: "1608138689408302",
            url: CST_AUTH_URL + "/facebook",
        });

        $authProvider.loginUrl = CST_AUTH_URL + "/login";
        $authProvider.signupUrl = CST_AUTH_URL + "/register";
    }

    angular
        .module("app")
        .config(config);
}
