module appState{
    export var users: string = "users";
    export var usersUrl: string = "/adm/users";
    export var user: string = "user";
}

module app.adm.users {
    "use strict";

    export interface IUserRouteParams{
        userId: string;
    }

    export interface IUserStateParams extends ng.ui.IStateParamsService, IUserRouteParams {
    }

    export class UserRouteParams implements IUserRouteParams{
        constructor(public userId: string) { }
    }

    route.$inject = [
        "$stateProvider"
    ];

    function route($stateProvider: ng.ui.IStateProvider) {
        $stateProvider
            .state(appState.users, {
            url: appState.usersUrl,
                views: {
                    'header': {
                        templateUrl: "app/views/headerMain/headerMain.html",
                        controller: "app.views.header.HeaderMainController",
                        controllerAs: "vm"
                    },
                    'container': {
                        templateUrl: "app/views/adm/users/users.html",
                        controller: "app.views.adm.users.UsersController",
                        controllerAs: "vm"
                    },
                    'footer': {}
                }
            })
            .state(appState.user, {
            url: appState.usersUrl + "/{userId}",
            views: {
                'header': {
                    templateUrl: "app/views/headerBackDeleteSave/headerBackDeleteSave.html",
                    controller: "app.views.header.HeaderBackDeleteSaveController",
                    controllerAs: "vm"
                },
                'container': {
                    templateUrl: "app/views/adm/users/user.html",
                    controller: "app.views.adm.users.UserController",
                    controllerAs: "vm"
                },
                'footer': {}
            }
            });
    };
    angular
        .module("app")
        .config(route);
}
