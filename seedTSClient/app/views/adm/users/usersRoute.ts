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

    //export class UserRoutesUrl {
    //    // boilerplate 
    //    constructor(public value: string) {
    //    }

    //    toString() {
    //        return this.value;
    //    }

    //    // values 
    //    static users = new UserRoutesUrl("/adm/users");
    //    static user = new UserRoutesUrl("world");
    //}

    export var CST_URL_Users: string = "/adm/users";
    export var CST_State_Users: string = "users";
    export var CST_State_User: string = "user";

    route.$inject = [
        "$stateProvider"
    ];

    function route($stateProvider: ng.ui.IStateProvider) {
        $stateProvider
            .state(CST_State_Users, {
            url: CST_URL_Users,
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
            .state(CST_State_User, {
            url: CST_URL_Users + "{userId}",
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
