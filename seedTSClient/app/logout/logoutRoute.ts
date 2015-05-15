
    module appState {
        "use strict";

        export var logoutState: string = "logout";
        export var logoutUrl: string = "/logout";
    }

module app.views.logout {
    "use strict";

    route.$inject = [
        "$stateProvider"
    ];
    function route($stateProvider: ng.ui.IStateProvider) {
        $stateProvider
            .state(appState.logoutState, {
            url: appState.logoutUrl,
            views: {
                'header': {},
                'container': {
                    templateUrl: app.logout.logoutTemplate_StringName,
                    controller: app.logout.logoutController_StringName,
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
