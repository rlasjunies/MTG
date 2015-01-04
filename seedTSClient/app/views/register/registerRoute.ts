module app.views.register {
    "use strict";

    route.$inject = [
        "$stateProvider"
    ];
    function route($stateProvider: ng.ui.IStateProvider) {
        $stateProvider
            .state("register", {
                url: "/register",
                templateUrl: "app/views/register/register.html",
                controller: "app.views.register.RegisterController",
                controllerAs: "vm"
            });
    };
    angular
        .module("app")
        .config(route);
}
