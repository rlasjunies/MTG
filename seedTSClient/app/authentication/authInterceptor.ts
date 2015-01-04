// TODO not sure this is needed anymore due to the usage of satellizer

module app.authentication {
    "use strict";
    export class AuthInterceptor {

        authToken: app.authentication.AuthToken;

        constructor(AuthToken: app.authentication.AuthToken) {
            this.authToken = AuthToken;
        }

        request = (config) => {
            var token = this.authToken.getToken();

            if (token) {
                config.headers.Authorization = "Bearer " + token;
            }

            return config;
        };

        response = (response) => {
            return response;
        };
    }


    factory.$inject = [
        "AuthToken"
    ];
    function factory(
        AuthToken: app.authentication.AuthToken) {
        return new app.authentication.AuthInterceptor(AuthToken);
    };
}
