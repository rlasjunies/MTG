module appState{
    export var MAIN: string = "main";
}
module app.main {
    "use strict";

    route.$inject = [
        "$stateProvider"
    ];
    function route($stateProvider: ng.ui.IStateProvider) {
        $stateProvider
            .state(appState.MAIN, {
                url: "/",
                views: {
                    'header': {
                        templateUrl: "app/views/headerMain/headerMain.html",
                        controller: app.header.headerMainController_StringName,
                        controllerAs: "vm",

                    },
                    'container': {
                        templateUrl: "app/views/main/main.html",
                        controller: app.main.mainController_NAME,
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
