import winston = require("winston");

// $log.error("error log");
// $log.warn("warn log");
// $log.info("info log");
// $log.debug("debug log");

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            level: "debug",
            colorize: true,
            timestamp: true
        })
        // new (winston.transports.File)({ filename: "somefile.log" })
    ]
});

export = logger
