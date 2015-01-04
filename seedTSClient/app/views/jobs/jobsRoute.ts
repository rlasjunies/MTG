module app.views.jobs {
    "use strict";

    route.$inject = [
        "$stateProvider"
    ];
    function route($stateProvider: ng.ui.IStateProvider) {
        $stateProvider
            .state("jobs", {
                url: "/jobs",
                templateUrl: "app/views/jobs/jobs.html",
                controller: "app.views.jobs.JobsController",
                controllerAs: "vm"
            });
    };
    angular
        .module("app")
        .config(route);
}
