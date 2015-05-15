module app.pictures {
    "use strict";

    export var pictureTemplate_StringName = "app/views/pictures/picture.html";
    export var pictureController_StringName = "app.pictures.PictureController";

    interface IPictureScope extends ng.IScope {
    }

    export class PictureController {
        private pictureFileName: string; //app.pictures.IPicture;
        static $inject = [
            "$scope",
            "$rootScope",
            "NotificationService",
            "$log",
            "$stateParams",
            "picturesService",
            "$mdDialog"
        ];
        constructor(
            private $scope: IPictureScope,
            private $rootScope: ng.IRootScopeService,
            private NotificationService: app.services.NotificationService,
            private $log: ng.ILogService,
            private $stateParams: app.pictures.IPictureStateParams,
            private picturesService: app.pictures.IPicturesService,
            private $mdDialog: any
            ) {

            //console.log("stateparam:" + JSON.stringify(this.$stateParams));
            if (!this.$stateParams.fileName) {
                alert("fileName is missing to initialize the picture detail view!");
                console.error("fileName is missing to initialize the user detail view!");
            } else {
                this.pictureFileName = this.$stateParams.fileName;

                //register event functions

                //Save
                //this.$scope.$on("save",() => {

                //    //this.userService.update(this.user)
                //    //    .then((user: app.services.IUser) => {
                //    //    this.$log.debug("user saved!:" + JSON.stringify(user));
                //    //    //this.NotificationService.info("User saved!");
                //    //}).catch((err) => {
                //    //    this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot save uers resources:");
                //    //    this.NotificationService.error("Error message: \n" + JSON.stringify(err), "Cannot save users resources:");
                //    //});

                //    this.$rootScope.goBack();
                //});

                //delete
                this.$scope.$on("delete",() => {

                    var confirm = $mdDialog.confirm()
                        .title('Confirm deletion')
                        .content('Are going to delete the fileName:' + this.pictureFileName)
                        .ariaLabel('Lucky day')
                        .ok('Cancel')
                        .cancel('Delete');

                    //.targetEvent(ev);
                    $mdDialog.show(confirm).then(() => { },() => {
                        //$scope.alert = 'You decided to get rid of your debt.';
                        this.picturesService.delete(this.$stateParams.fileName)
                            .then((picture: app.pictures.IPicture) => {
                            this.$log.debug("user deleted!:" + JSON.stringify(picture));
                            //this.NotificationService.info("User saved!");
                        }).catch((err) => {
                            this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot delete picture resource!");
                            this.NotificationService.error("Error message: \n" + JSON.stringify(err), "Cannot delete resource!");
                        });

                        this.$rootScope.goBack();
                    });
                });

                //this.$scope.$watch(() => this.$scope.userForm.$invalid,(newValue, oldValue) => {
                //    //console.log("watch [" + newValue + "] -> [" + oldValue + "]");
                //    if (newValue) {
                //        this.$scope.$emit("invalid");
                //    } else {
                //        this.$scope.$emit("valid");
                //    }
                //});
            }

            this.$log.debug(pictureController_StringName + ": Constructor");
        }
    }

    angular
        .module("app")
        .controller(pictureController_StringName, app.pictures.PictureController);
}
