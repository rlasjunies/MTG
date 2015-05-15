module app.pictures {
    "use strict";

    export var picturesTemplate_StringName = "app/views/pictures/pictures.html";
    export var picturesController_StringName = "app.pictures.PicturesController";

    export class PicturesController {
        pictures: IPictures;

        static $inject = [
            "$rootScope",
            "$scope",
            "$http",
            "CST_API_URL",
            "NotificationService",
            "$log",
            "$auth",
            "$state",
            app.pictures.picturesService_StringName
        ];
        constructor(
            private $rootScope: ng.IRootScopeService,
            private $scope: ng.IScope,
            private $http: ng.IHttpService,
            private CST_API_URL,
            private NotificationService: app.services.NotificationService,
            private $log: ng.ILogService,
            private $auth: satellizer.IAuthService,
            private $state: ng.ui.IStateService,
            private picturesService: app.pictures.IPicturesService) {

            console.log(picturesController_StringName + " loaded!");

            //header definition
            this.$rootScope.headerTitle = "";

            this.$scope.$on("$destroy",() => {
                this.$rootScope.headerTitle = "";
            });

            //add new pictures
            this.$scope.$on(appRootScopeEvent.addNew,() => {
                this.$state.go(appState.picturesLoad);
            });

            picturesService.getAll().then(
                (picturesFromServer: any) => {
                    this.pictures = picturesFromServer.files;
                }).catch(
                (reason: any) => {
                    console.log("Error getting all pictures:" + reason);
                });


        }

        onClick = (fileName: string): void => {
            var picturesParams: app.pictures.PictureRouteParams = new app.pictures.PictureRouteParams(fileName);
            this.$state.go(appState.picture, picturesParams);
            //this.$state.go("user", picturesParams);
        }
    }

    angular
        .module("app")
        .controller(app.pictures.picturesController_StringName, app.pictures.PicturesController);
}