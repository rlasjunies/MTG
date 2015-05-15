module app.views.main {
    "use strict";

    route.$inject = [
        "$stateProvider"
    ];
    function route($stateProvider: ng.ui.IStateProvider) {
        $stateProvider
            .state("setup", {
                url: "/setup",
                views: {
                    'header': {
                        templateUrl: "app/views/headerMain/headerMain.html",
                        controller: app.header.headerMainController_StringName,
                        controllerAs: "vm"
                    },
                    'container': {
                        templateUrl: "app/views/setup/setup.html",
                        controller: "app.views.setup.setupController",
                        controllerAs: "vm"
                    },
                    'footer': { }
                }
            });
    };
    angular
        .module("app")
        .config(route);
}
