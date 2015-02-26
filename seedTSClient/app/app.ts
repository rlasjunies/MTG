module app {
    "use strict";

    angular
        .module("app", [
            "ngMaterial",
            "satellizer",
            "ui.router",
        "ngMessages",
        //TODO may be good to replace the loading bar control (ngControl), by the NGMD one
            "angular-loading-bar"
        ]);
}
