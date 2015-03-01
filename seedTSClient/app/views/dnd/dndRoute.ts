module app.views.main {
    "use strict";

    route.$inject = [
        "$stateProvider"
    ];
    function route($stateProvider: ng.ui.IStateProvider) {
        $stateProvider
            .state("dnd", {
                url: "/dnd",
                views: {
                    'header': {
                        templateUrl: "app/views/headerMain/headerMain.html",
                        controller: "app.views.header.HeaderMainController",
                        controllerAs: "vm"
                    },
                    'container': {
                        templateUrl: "app/views/dnd/dnd.html",
                        controller: "app.views.dnd.DndController",
                        controllerAs: "vmdnd"
                    },
                    'footer': { }
                }
            });
    };
    angular
        .module("app")
        .config(route);
}
