module app.views.jobs {
    "use strict";

    export interface IJob {
        name: string;
    }
    export class JobsController {
        public jobs: IJob[] = [];

        static $inject = [
            "$scope",
            "$http",
            "CST_API_URL",
            "NotificationService"
        ];
        constructor(
            private $scope: ng.IScope,
            private $http: ng.IHttpService,
            private CST_API_URL,
            private NotificationService: app.services.NotificationService) {

            $http.get(this.CST_API_URL + "/jobs")
                .error((err) => {
                    this.NotificationService.error("Error message: \n" + JSON.stringify(err), "Cannot load jobs resources:");
                })
                .success((jobs:IJob[]) => {
                    this.jobs = jobs;
                });

            console.log("JobsController: Constructor");
            console.log(JSON.stringify(this.jobs));

        }
    }

    angular
        .module("app")
        .controller("app.views.jobs.JobsController", app.views.jobs.JobsController);
}
