module app.views.register {
    "use strict";

    route.$inject = [
        "$stateProvider"
    ];
    function route($stateProvider: ng.ui.IStateProvider) {
        $stateProvider
            .state("register", {
            url: "/register",
            views: {
                'header': {},
                'container': {
                    templateUrl: "app/views/register/register.html",
                    controller: "app.views.register.RegisterController",
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
