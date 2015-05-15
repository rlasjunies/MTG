module app.pictures {
    "use strict";

    interface IUploadFileEvt {
        loaded: number;
        total: number;
        config: any;
    }

    export var pictureUploadTemplate_StringName = "app/views/pictures/picturesUpload.html";
    export var pictureUploadController_StringName = "app.pictures.PicturesUploadController";

    export class PicturesUploadController {
        files: File[];
        uploader: any;

        static $inject = [
            "$scope",
            "$rootScope",
            "$http",
            "CST_API_URL",
            "NotificationService",
            "$log",
            "FileUploader",
            "$auth",
            "$state"
        ];
        constructor(
            private $scope: ng.IScope,
            private $rootScope: ng.IRootScopeService,
            private $http: ng.IHttpService,
            private CST_API_URL,
            private NotificationService: app.services.NotificationService,
            private $log: ng.ILogService,
            private FileUploader,
            private $auth: satellizer.IAuthService,
            private $state: ng.ui.IStateService) {

            console.log( app.pictures.pictureUploadController_StringName + " loaded!");

            var FileUploadConfig: angular.FileUpload.FileUploadConfig;

            FileUploadConfig = {
                url: "/api/pictures/upload",
                autoUpload: true,
                removeAfterUpload: true,
                headers: {
                    "authorization": "Bearer " + this.$auth.getToken()
                }
            };
            this.uploader = new this.FileUploader(FileUploadConfig);

            this.uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
                console.info('onWhenAddingFileFailed', item, filter, options);
            };
            this.uploader.onAfterAddingFile = function (fileItem) {
                console.info('onAfterAddingFile', fileItem);
            };
            this.uploader.onAfterAddingAll = function (addedFileItems) {
                console.info('onAfterAddingAll', addedFileItems);
            };
            this.uploader.onBeforeUploadItem = function (item) {
                console.info('onBeforeUploadItem', item);
            };
            this.uploader.onProgressItem = function (fileItem, progress) {
                console.info('onProgressItem', fileItem, progress);
            };
            this.uploader.onProgressAll = function (progress) {
                console.info('onProgressAll', progress);
            };
            this.uploader.onSuccessItem = function (fileItem, response, status, headers) {
                console.info('onSuccessItem', fileItem, response, status, headers);
            };
            this.uploader.onErrorItem = function (fileItem, response, status, headers) {
                console.info('onErrorItem', fileItem, response, status, headers);
            };
            this.uploader.onCancelItem = function (fileItem, response, status, headers) {
                console.info('onCancelItem', fileItem, response, status, headers);
            };
            this.uploader.onCompleteItem = (fileItem, response, status, headers) => {
                console.info('onCompleteItem', fileItem, response, status, headers);
            };
            this.uploader.onCompleteAll = () => {
                console.info('onCompleteAll');
                this.$rootScope.goBack();
            };

            console.info('uploader', this.uploader);

        }
    }

    angular
        .module("app")
        .controller(app.pictures.pictureUploadController_StringName, app.pictures.PicturesUploadController);
}
