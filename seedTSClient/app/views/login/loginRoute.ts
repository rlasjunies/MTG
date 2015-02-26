module app.views.login {
    "use strict";

    route.$inject = [
        "$stateProvider"
    ];
    function route($stateProvider: ng.ui.IStateProvider) {
        $stateProvider
            .state("login", {
            url: "/login",
            views: {
                'header': {},
                'container': {
                    templateUrl: "app/views/login/login.html",
                    controller: "app.views.login.LoginController",
                    controllerAs: "vm"
                },
                'footer': {}
            }
            });
    };
    angular
        .module("app")
        .config(route);
}
