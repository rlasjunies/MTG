exports.config = {
    seleniumAddress: (process.env.SELENIUM_URL || "http://localhost:4444/wd/hub"),
    specs: ["*-spec.js"],
    framework: "mocha",
    mochaOpts: {
        reporter: "spec",
        timeout: 4000,
    },
    multiCapabilities: [
        {
            browserName: "firefox",
            version: "ANY"
        },
    ],
    baseUrl: "http://" + (process.env.HTTP_HOST || "localhost") + ":" + (process.env.HTTP_PORT || 3000),
};
//# sourceMappingURL=_config.js.map