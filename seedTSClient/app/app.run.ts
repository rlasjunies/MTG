// TODO in the user module
interface IAppCookies {
    userId: string;
}

module appRootScopeEvent{
    export var invalidForm: string = "invalid";
    export var validForm: string = "valid";
    export var delete_ :string = "delete";
    export var addNew: string = "add";
    export var save: string = "save";

}
//this.cleanUpFunc1 = this.$rootScope.$on("invalid",() => {
//    this.invalid = true;
//});

//$scope.$on('$destroy',() => {
//    this.cleanUpFunc2();
//});


module app.run {
    "use strict";

    angular
        .module("app")
        .run(run);

    run.$inject = [
        "$rootScope",
        "$location",
        "$window",
        "$state",
    ];
    function run(
        $rootScope: ng.IRootScopeService,
        $location: ng.ILocationService,
        $window: ng.IWindowService,
        $state: ng.ui.IStateService): void {

        $rootScope.$on("$routeChangeError",(): void => {
            alert("routeChangeError raised!");
        });

        // previous state handling
        $rootScope.previousState = {name: "", params: {}};
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            // store previous state in $rootScope
            $rootScope.previousState.name = fromState.name;
            $rootScope.previousState.params = fromParams;
        });

        $rootScope.goBack = function () {
            $window.history.back();
        }

        $rootScope.save = function(){
            $rootScope.$broadcast(appRootScopeEvent.save);
        }

        $rootScope.delete = function () {
            $rootScope.$broadcast(appRootScopeEvent.delete_);
        }

        $rootScope.addNew = function () {
            $rootScope.$broadcast(appRootScopeEvent.addNew);
        }

        $rootScope.headerTitle = "";
    
    }

    // TODO
    // currentUser.userId = $cookies.userId; 

    // Authentication not sure is needed anymore using stelizzer
    // ($window: ng.IWindowService) => {
    //    var params = $window.location.search.substring(1);

    //    console.log("run:" + $window.location.search);

    //    if (params && $window.opener && ($window.opener.location.origin === $window.location.origin)) {
    //        var pair = params.split("=");
    //        var code = decodeURIComponent(pair[1]);

    //        $window.opener.postMessage(code, $window.location.origin);
    //    }
}
