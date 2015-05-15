module app.header {
    "use strict";

    export var headerTemplate_StringName = "app/header/header.html";
    export var headerController_StringName = "app.header.HeaderController";

    export interface IHeaderConfiguration {
        headerTitle: string;
        headerButtonMenuActivated: boolean;
        headerButtonBackActivated: boolean;
        headerButtonLoginActivated: boolean;
        headerButtonAddActivated: boolean;
        headerButtonSaveActivated: boolean;
        headerButtonDeleteActivated: boolean;

    }

    export class HeaderConfiguration implements IHeaderConfiguration{
        constructor( public headerTitle :string = "",
             public headerButtonMenuActivated: boolean = false,
             public headerButtonBackActivated: boolean = false,
             public headerButtonLoginActivated: boolean = false,
             public headerButtonAddActivated: boolean = false,
             public headerButtonSaveActivated: boolean = false,
             public headerButtonDeleteActivated: boolean = false){
        }

    }

    interface IHeaderScope {
        // isAuthenticated(): boolean; 
    }

    export class HeaderController {
        public invalid: boolean;
        public cleanUpFunc1: any;
        public cleanUpFunc2: any;

        static $inject = [
            "$rootScope",
            "$scope",
            "$log"
        ];
        constructor(
            private $rootScope:ng.IRootScopeService,
            private $scope: ng.IScope,
            private $log: ng.ILogService) {
            this.$log.debug(app.header.headerController_StringName + "loaded!");

            //set and manage the save button valid state
            this.invalid = false;

            this.cleanUpFunc1 = this.$rootScope.$on(appRootScopeEvent.invalidForm,() => {
                this.invalid = true;
            });

            this.cleanUpFunc2 = this.$rootScope.$on(appRootScopeEvent.validForm,() => {
                this.invalid = false;
            });

            $scope.$on('$destroy',() => {
                this.cleanUpFunc1();
                this.cleanUpFunc2();
            });
        }
}

angular
    .module("app")
    .controller(headerController_StringName, app.header.HeaderController);
}

