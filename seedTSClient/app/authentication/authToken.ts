module app.authentication {
    "use strict";
    var CST_KEY : string = "TOKEN";
    export class AuthToken {
        storage : Storage;
        cachedToken: string;
        constructor(private $window: ng.IWindowService, private $log:ng.ILogService) {
            this.storage = $window.localStorage;
            this.$log.debug("authToken service ... loaded");
        }

        setToken = (token: string): void => {
            this.cachedToken = token;
            this.storage.setItem(CST_KEY, token);
            this.$log.debug("authToken: SetToken");
        }

        getToken = (): string => {
            if (!this.cachedToken) {
                this.cachedToken = this.storage.getItem(CST_KEY);
            }
            return this.cachedToken;
        }

        remove = (): void => {
            this.cachedToken = null;
            this.storage.removeItem(CST_KEY);
            this.$log.debug("remove token");
        }

        isAuthenticated = (): boolean => {
            if (this.getToken() === null) {
                return false;
            }
            return true;
        }
    }

    factory.$inject = [
        "$window","$log"
    ];
    function factory($window:ng.IWindowService, $log) : app.authentication.AuthToken {
        return new app.authentication.AuthToken($window, $log);
    }

    angular
        .module("app")
        .factory("AuthToken", factory);
}
