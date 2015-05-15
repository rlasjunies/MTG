module appState {
    "use strict";

    export var picturesLoad: string = "PICTUREUPLOAD";
    export var picturesLoadUrl: string = "/picturesupload";
    export var picturesList: string = "PICTURES";
    export var picturesListUrl: string = "/pictures";
    export var picture: string = "PICTURE";
}

module app.pictures {
    "use strict";

    export interface IPictureRouteParams {
        fileName: string;
    }

    export interface IPictureStateParams extends ng.ui.IStateParamsService, IPictureRouteParams {
    }

    export class PictureRouteParams implements IPictureRouteParams {
        constructor(public fileName: string) { }
    }

    route.$inject = [
        "$stateProvider"
    ];
    function route($stateProvider: ng.ui.IStateProvider) {
        $stateProvider
            .state(appState.picturesList, {
            url: appState.picturesListUrl,
            views: {
                'header': {
                    templateUrl: app.header.headerAddTemplate_StringName,
                    controller: app.header.headerAddController_StringName,
                    controllerAs: "vm"
                },
                'container': {
                    templateUrl: app.pictures.picturesTemplate_StringName,
                    controller: app.pictures.picturesController_StringName,
                    controllerAs: "vm"
                },
                'footer': {}
            }
        }).state(appState.picture, {
            url: appState.picturesListUrl + "/{fileName}",
            views: {
                'header': {
                    templateUrl: app.header.headerBackDeleteSaveTemplate_StringName,
                    controller: app.header.headerBackDeleteSaveController_StringName,
                    controllerAs: "vm"
                },
                'container': {
                    templateUrl: app.pictures.pictureTemplate_StringName,
                    controller: app.pictures.pictureController_StringName,
                    controllerAs: "vm"
                },
                'footer': {}
            }
        }).state(appState.picturesLoad, {
            url: appState.picturesLoadUrl,
            views: {
                'header': {
                    templateUrl: app.header.headerMainTemplate_StringName,
                    controller: app.header.headerMainController_StringName,
                    controllerAs: "vm"
                },
                'container': {
                    templateUrl: app.pictures.pictureUploadTemplate_StringName,
                    controller: app.pictures.pictureUploadController_StringName,
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
