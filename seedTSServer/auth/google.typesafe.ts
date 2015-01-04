// import express = require("../../jwt-client/Scripts/typings/express/express");
import express = require("express");

export interface IAuthGoogleBody {
    code: string;
    clientId: string;
    redirectUri: string;
}

// export class AuthGoogleBody implements IAuthGoogleBody {
//    constructor(public code: string) { }
// }

export interface IAuthGoogleRequest extends express.Request {
    body: IAuthGoogleBody;
}
