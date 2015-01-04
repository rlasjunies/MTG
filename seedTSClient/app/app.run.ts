// TODO in the user module
interface IAppCookies {
    userId: string;
}

module app.run {
    "use strict";

    angular
        .module("app")
        .run(run);

    run.$inject = [
        "$rootScope",
        // "$window",
        // "currentUser",
    ];
    function run(
        $rootScope: ng.IRootScopeService
        // $window: ng.IWindowService,
        // currentUser: ICurrentUser): void {
        ):void{

        $rootScope.$on("$routeChangeError", (): void => {
            alert("routeChangeError raised!");
        });

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
}
