module app.services {
    "use strict";

    export interface ISiteSettings {
        title: string;
        description: string;
        themeName: string;
        availableThemeNames: string[];
    }

    export interface ISiteSettingsService {
        getSettings(): ng.IPromise<ISiteSettings>;
        getThemes(): ng.IPromise<string[]>;
        updateSettings(siteSettings: ISiteSettings): void;
    }

    class SiteSettingsService implements ISiteSettingsService {
        constructor(private $http: ng.IHttpService,
            private CST_API_URL: string) {
        }

        getSettings(): ng.IPromise<ISiteSettings> {
            return this.$http.get(this.CST_API_URL + "/site")
                .then((response: ng.IHttpPromiseCallbackArg<ISiteSettings>): ISiteSettings => {
                    return <ISiteSettings>response.data;
                });
        }

        updateSettings(siteSettings: ISiteSettings): void {
            throw new Error("not implemented yet!");
         }

        getThemes(): ng.IPromise<string[]> {
            return this.$http.get(this.CST_API_URL + "/themes")
                .then((response: ng.IHttpPromiseCallbackArg<string[]>): string[] => {
                    return <string[]>response.data;
                });
        }
    }

    factory.$inject = [
        "$http",
        "CST_API_URL"
    ];
    function factory($http: ng.IHttpService,
        CST_API_URL:string): ISiteSettingsService {
        return new SiteSettingsService($http, CST_API_URL);
    }

    angular
        .module("app")
        .factory("app.services.SiteSettingsService", factory);
}
