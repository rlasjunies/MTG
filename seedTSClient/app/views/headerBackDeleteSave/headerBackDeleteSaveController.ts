module app.views.header {
    "use strict";

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

            this.$log.debug("HeaderBackSaveController: Constructor");

            //set and manage the save button valid state
            this.invalid = false;

            this.cleanUpFunc1 = this.$rootScope.$on("invalid",() => {
                this.invalid = true;
            });

            this.cleanUpFunc2 = this.$rootScope.$on("valid",() => {
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
    .controller("app.views.header.HeaderBackDeleteSaveController", app.views.header.HeaderBackDeleteSaveController);
}

