module app.views.paints {
    "use strict";

    route.$inject = [
        "$stateProvider"
    ];
    function route($stateProvider: ng.ui.IStateProvider) {
        $stateProvider
            .state("paints", {
                url: "/paints",
                templateUrl: "app/views/paints/paints.html",
                controller: "app.views.paints.PaintsController",
                controllerAs: "vm"
            });
    };
    angular
        .module("app")
        .config(route);
}
