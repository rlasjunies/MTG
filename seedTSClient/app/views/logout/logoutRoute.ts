module app.views.logout {
    "use strict";

    route.$inject = [
        "$stateProvider"
    ];
    function route($stateProvider: ng.ui.IStateProvider) {
        $stateProvider
            .state("logout", {
                url: "/logout",
                controller: "app.views.logout.LogoutController",
                controllerAs: "vm"
            });
    };
    angular
        .module("app")
        .config(route);
}
