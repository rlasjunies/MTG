/// <reference path="../../scripts/typings/angular-material.d.ts" />
module app.services {
    "use strict";

    //interface IToastr {
    //    success(message: string, title: string): void;
    //    error(message: string, title: string): void;
    //    info(message: string, title: string): void;
    //    warning(message: string, title: string): void;
    //    options: any;
    //}

    //declare var toastr: IToastr;

    class Config implements ngmd.toastConf {
        hideDelay: number;
        content: string;
    }

    export class NotificationService {
        toastConfig: Config ;
        public success(message: string, title?: string): void {
            if (title === undefined) {
                title = "";
            }
            //toastr.success(message, title);
            //this.toastConfig.content = title;
            var toast = this.$mdToast.simple()
                .content(message)
                .hideDelay(1000);
            //.action('OK');
            //.highlightAction(false)
            //.position($scope.getToastPosition());
            this.$mdToast.show(toast);
            //this.$mdToast.show(toast).then(function () {
            //    alert('You clicked \'OK\'.');
            //});

        }

        public error(message: string, title?:string): void {
            if (title === undefined) {
                title = "";
            }
            //toastr.error(message, title);
            var toast = this.$mdToast.simple()
                .content(message)
                .hideDelay(1000);
            this.$mdToast.show(toast);
        }

        public info(message: string, title?: string): void {
            if (title === undefined) {
                title = "";
            }
            //toastr.info(message, title);
            var toast = this.$mdToast.simple()
                .content(message)
                .hideDelay(1000);
            this.$mdToast.show(toast);
        }

        public warning(message: string, title?: string): void {
            if (title === undefined) {
                title = "";
            }
            //toastr.warning(message, title);
            var toast = this.$mdToast.simple()
                .content(message)
                .hideDelay(1000);
            this.$mdToast.show(toast);
        }

        constructor(public $mdToast:ngmd.toastService) {
            console.log("notificationService ... loaded");
            this.toastConfig = new Config();
            //this.toastConfig.position = new ngmd.toastPosition();
            this.toastConfig.hideDelay = 1000;
            //this.toastConfig.position.right = true;
            //this.toastConfig.position.bottom = true;

            //toastr.options = {
            //    "positionClass": "toast-bottom-right",
            //};
        }
    }

    factory.$inject = ["$mdToast"];
    function factory($mdToast) {
        return new app.services.NotificationService($mdToast);
    }

    angular
        .module("app")
        .factory("NotificationService", factory);
}
