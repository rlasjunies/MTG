var winston = require("winston");
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
    ]
});
module.exports = logger;
//# sourceMappingURL=logger.js.map