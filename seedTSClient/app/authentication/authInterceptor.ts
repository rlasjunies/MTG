module app.authentication {
    "use strict";
    export class AuthInterceptor {

        constructor(private $auth: satellizer.IAuthService) {
        }

        request = (config) => {
            var token = this.$auth.getToken();

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
        "$auth"
    ];
    function factory(
        $auth: satellizer.IAuthService) {
        return new app.authentication.AuthInterceptor($auth);
    };
}
