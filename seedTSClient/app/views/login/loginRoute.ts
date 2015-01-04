module app.views.login {
    "use strict";

    route.$inject = [
        "$stateProvider"
    ];
    function route($stateProvider: ng.ui.IStateProvider) {
        $stateProvider
            .state("login", {
                url: "/login",
                templateUrl: "app/views/login/login.html",
                controller: "app.views.login.LoginController",
                controllerAs: "vm"
            });
    };
    angular
        .module("app")
        .config(route);
}
