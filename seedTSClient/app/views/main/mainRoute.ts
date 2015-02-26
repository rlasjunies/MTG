module app.views.main {
    "use strict";

    route.$inject = [
        "$stateProvider"
    ];
    function route($stateProvider: ng.ui.IStateProvider) {
        $stateProvider
            .state("main", {
                url: "/",
                views: {
                    'header': {
                        templateUrl: "app/views/headerMain/headerMain.html",
                        controller: "app.views.header.HeaderMainController",
                        controllerAs: "vm"
                    },
                    'container': {
                        templateUrl: "app/views/main/main.html",
                        controller: "app.views.main.MainController",
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
