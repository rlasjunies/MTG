module appState {
    "use strict";

    export var registerState: string = "register";
    export var registerUrl: string = "/register";
}

module app.views.register {
    "use strict";

    route.$inject = [
        "$stateProvider"
    ];
    function route($stateProvider: ng.ui.IStateProvider) {
        $stateProvider
            .state(appState.registerState, {
            url: appState.registerUrl,
            views: {
                'header': {
                    templateUrl: app.header.headerTemplate_StringName,
                    controller: app.header.headerController_StringName,
                    controllerAs: "vm"
                    },
                'container': {
                    templateUrl: app.register.registerTemplate_StringName,
                    controller: app.register.registerController_StringName,
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
