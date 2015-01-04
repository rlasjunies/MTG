module app.views.main {
    "use strict";

    route.$inject = [
        "$stateProvider"
    ];
    function route($stateProvider: ng.ui.IStateProvider) {
        $stateProvider
            .state("main", {
                url: "/",
                templateUrl: "app/views/main/main.html",
                controller: "app.views.main.MainController",
                controllerAs: "vm"
            });
    };
    angular
        .module("app")
        .config(route);
}
