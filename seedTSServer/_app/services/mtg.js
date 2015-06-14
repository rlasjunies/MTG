var $log = require("./logger");
var stringPolyFill = require("./string+");
var Server = (function () {
    function Server() {
    }
    return Server;
})();
var Util = (function () {
    function Util() {
        this.string = stringPolyFill;
    }
    return Util;
})();
exports.util = new Util();
exports.server = new Server();
exports.log = $log;
//# sourceMappingURL=mtg.js.map