module app.views.paints {
    "use strict";

    export interface IPaint {
        name: string;
    }
    export class PaintsController {
        public paints: IPaint[] = [];

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

            $http.get(this.CST_API_URL + "/paints")
                .error((err) => {
                    this.NotificationService.error("Error message: \n" + JSON.stringify(err), "Cannot load paints resources:");
                })
                .success((paints:IPaint[]) => {
                    this.paints = paints;
                });

            console.log("PaintsController: Constructor");
            console.log(JSON.stringify(this.paints));

        }
    }

    angular
        .module("app")
        .controller("app.views.paints.PaintsController", app.views.paints.PaintsController);
}
