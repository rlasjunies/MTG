module app.constants {
    "use strict";

    //angular
    //    .module("app")
    //    .constant("CST_URL", "")
    //    .constant("CST_API_URL", "/api")
    //    .constant("CST_AUTH_URL", "/login");

    //angular
    //    .module("app")
    //    .value("CST_URL", "")
    //    .value("CST_API_URL", "")
    //    .value("CST_AUTH_URL", "");

    console.log("window.location@app.constant:" + window.location.protocol + "//" + window.location.host);
    //update the URL constant to be based on site URL
    angular
        .module("app")
        .constant("CST_URL", window.location.protocol + "//" + window.location.host + "/")
        .constant("CST_API_URL", window.location.protocol + "//" + window.location.host + "/api")
        .constant("CST_AUTH_URL", window.location.protocol + "//" + window.location.host + "/auth");

}
