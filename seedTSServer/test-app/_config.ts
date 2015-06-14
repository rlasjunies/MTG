
exports.config = {
    seleniumAddress: (process.env.SELENIUM_URL || "http://localhost:4444/wd/hub"),
    specs: ["login-spec.js"],
    framework: "mocha",
    mochaOpts: {
        reporter: "spec",
        timeout: 4000,
    },
    multiCapabilities: [
        {
           browserName: "chrome",
           version: "ANY"
        },
        // {
        //     browserName: "firefox",
        //     version: "ANY"
        // },
        //{
        //    browserName: "internet explorer",
        //    version: "ANY"
        //},

    ],
    baseUrl: "http://" + (process.env.HTTP_HOST || "localhost") + ":" + (process.env.HTTP_PORT || 3000),

    //params: {
    //    login: {
    //        user: "Jane",
    //        password: "1234"
    //    }
    //}
}