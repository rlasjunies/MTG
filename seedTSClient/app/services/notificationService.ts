module app.services {
    "use strict";

    interface IToastr {
        success(message: string, title: string): void;
        error(message: string, title: string): void;
        info(message: string, title: string): void;
        warning(message: string, title: string): void;
        options: any;
    }

    declare var toastr: IToastr;

    export class NotificationService {
        public success(message: string, title?: string): void {
            if (title === undefined) {
                title = "";
            }
            toastr.success(message, title);
        }

        public error(message: string, title?:string): void {
            if (title === undefined) {
                title = "";
            }
            toastr.error(message, title);
        }

        public info(message: string, title?: string): void {
            if (title === undefined) {
                title = "";
            }
            toastr.info(message, title);
        }

        public warning(message: string, title?: string): void {
            if (title === undefined) {
                title = "";
            }
            toastr.warning(message, title);
        }

        constructor() {
            console.log("notificationService ... loaded");
            toastr.options = {
                "positionClass": "toast-bottom-right",
            };
        }
    }



    factory.$inject = [];
    function factory() {
        return new app.services.NotificationService();
    }

    angular
        .module("app")
        .factory("NotificationService", factory);
}
