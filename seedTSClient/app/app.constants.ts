module app.constants {
    "use strict";

    angular
        .module("app")
        .constant("CST_URL", "http://localhost:3000/")
        .constant("CST_API_URL", "http://localhost:3000/api")
        .constant("CST_AUTH_URL", "http://localhost:3000/auth");
}
