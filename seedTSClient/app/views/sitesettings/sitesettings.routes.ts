module app.sitesettings {
    "use strict";

    angular
        .module("app.sitesettings")
        .config([
            "$routeProvider",
            "$locationProvider",
            config]);

    function config(
        $routeProvider: ng.route.IRouteProvider,
        $locationProvider: ng.ILocationProvider): void {
        $routeProvider
            .when("/admin/sitesettings", {
                templateUrl: "app/views/sitesettings/sitesettings.html",
                controller: "app.views.sitesettings.SiteSettingsController",
                controllerAs: "vm",
                resolve: {
                    siteSettings: siteSettingsResolve
                }
            });
    }

    siteSettingsResolve.$inject = ["app.services.SiteSettingsService"];
    function siteSettingsResolve(
        siteSettingsService: app.services.ISiteSettingsService): ng.IPromise<app.services.ISiteSettings> {
        return siteSettingsService.getSettings()
            .then((siteSettings: app.services.ISiteSettings): ng.IPromise<app.services.ISiteSettings> => {
                return siteSettingsService.getThemes()
                    .then((themeNames: string[]): app.services.ISiteSettings => {
                        siteSettings.availableThemeNames = themeNames;
                        return siteSettings;
                    });
            });
    }
}
