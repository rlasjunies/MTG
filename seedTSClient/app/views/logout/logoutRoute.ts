module app.views.logout {
    "use strict";

    route.$inject = [
        "$stateProvider"
    ];
    function route($stateProvider: ng.ui.IStateProvider) {
        $stateProvider
            .state("logout", {
            url: "/logout",
            views: {
                'header': {},
                'container': {
                    templateUrl: "app/views/logout/logout.html",
                    controller: "app.views.logout.LogoutController",
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
