module app.views.sitesettings {
    "use strict";

    interface ISiteSettingsScope {
        siteSettings: app.services.ISiteSettings;
        themeNames: string[];
        save: () => void;
    }

    export class SiteSettingsController implements ISiteSettingsScope {
        siteSettings: app.services.ISiteSettings;
        themeNames: string[] = [];

        static $inject = [
            "siteSettings",
            "app.services.SiteSettingsService"
        ];
        constructor(siteSettings: app.services.ISiteSettings,
            private siteSettingsService: app.services.ISiteSettingsService) {
            this.siteSettings = siteSettings;
            this.themeNames = siteSettings.availableThemeNames;
        }

        save(): void {
            throw new Error("Not implemented yet!");
        }
    }

    angular
        .module("app")
        .controller("app.sitesettings.SiteSettingsController", app.views.sitesettings.SiteSettingsController);
}
