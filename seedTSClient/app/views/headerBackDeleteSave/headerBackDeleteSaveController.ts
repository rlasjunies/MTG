module app.header {
    "use strict";

    export var headerBackDeleteSaveTemplate_StringName = "app/views/headerBackDeleteSave/headerBackDeleteSave.html";
    export var headerBackDeleteSaveController_StringName = "app.header.BackDeleteSaveController";

    interface IHeaderScope {
        // isAuthenticated(): boolean; 
    }

    export class HeaderBackDeleteSaveController {
        //public isAuthenticated: Function;
        // public $auth:  //any; //: services.AuthToken;
        public invalid:boolean;
        public cleanUpFunc1: any;
        public cleanUpFunc2: any;
        

        static $inject = [
            "$scope",
            "$rootScope",
            "$log",
            "$location"
        ];
        constructor(
            private $scope: ng.IScope,
            private $rootScope: ng.IScope,
            private $log: ng.ILogService,
            private $state: ng.ui.IStateService) {

            this.$log.debug(headerBackDeleteSaveController_StringName + ": Constructor");

            //set and manage the save button valid state
            this.invalid = false;

            this.cleanUpFunc1 = this.$rootScope.$on(appRootScopeEvent.invalidForm,() => {
                this.invalid = true;
            });

            this.cleanUpFunc2 = this.$rootScope.$on(appRootScopeEvent.validForm,() => {
                this.invalid = false;
            });

            $scope.$on('$destroy', () => {
                this.cleanUpFunc1();
                this.cleanUpFunc2();
            });
        }

    }
angular
    .module("app")
    .controller(headerBackDeleteSaveController_StringName, app.header.HeaderBackDeleteSaveController);
}

