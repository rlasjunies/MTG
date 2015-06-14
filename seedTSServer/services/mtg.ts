import $log = require("./logger");
import stringPolyFill = require("./string+");

class Server{
    rootPath: string;
    picturesPath: string;
    dataPath: string;
    accessRightFileName: string;
    rolesFileName: string;
    emailVerificationFileName: string;
}

class Util{
    string = stringPolyFill;
}

export var util = new Util();
export var server: Server = new Server();
export var log = $log;
