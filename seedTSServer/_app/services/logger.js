var winston = require("winston");
var myCustomLevels = {
    levels: {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3
    },
    colors: {
        debug: "cyan",
        info: "green",
        warn: "yellow",
        error: "red"
    }
};
var logger = new (winston.Logger)({
    levels: myCustomLevels.levels,
    colors: myCustomLevels.colors,
    transports: [
        new (winston.transports.Console)({
            level: "warn",
            colorize: true,
            timestamp: true
        })
    ]
});
module.exports = logger;
//# sourceMappingURL=logger.js.map