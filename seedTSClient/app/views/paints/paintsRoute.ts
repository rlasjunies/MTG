module app.views.paints {
    "use strict";

    route.$inject = [
        "$stateProvider"
    ];
    function route($stateProvider: ng.ui.IStateProvider) {
        $stateProvider
            .state("paints", {
                url: "/paints",
                views: {
                    'header': {
                        templateUrl: "app/views/headerMain/headerMain.html",
                        controller: "app.views.header.HeaderMainController",
                        controllerAs: "vm"
                    },
                    'container': {
                        templateUrl: "app/views/paints/paints.html",
                        controller: "app.views.paints.PaintsController",
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
