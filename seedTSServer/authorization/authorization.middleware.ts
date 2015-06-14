import e = require("express");
import $ = require("../services/mtg");
import fs = require("fs-extra");
import $usersModel = require("../models/user");

var moduleName = "authorizationService@";

export function checksRole(roles:string[]) {
    return function (req:e.Request, res:e.Response, next:Function) {
        var allowed:boolean= false;
        
        for (var role of roles){
            if ( req.user.allowedRoles.indexOf(role) !== -1){
                allowed=true;
            }
        }
        
        if (!allowed) {
             var msg = "Not allowed; Missing role:" + roles.concat(",");
             $.log.info(msg);
             res.status(403).send({ message: msg });
        } else {
             next(); 
        }
    }
}

export function checksAccessRight(accessRight:string) {
    return function (req:e.Request, res:e.Response, next:Function) {
        var allowed:boolean= false;

        loadAccessRightFromRoles(req.user.allowedRoles,(accessRights:string[])=>{
            //$.log.info(`found:${accessRight} in :[${JSON.stringify(accessRights)}]`)
            $.log.info("accessRights:" + JSON.stringify(accessRights));
            $.log.info(`accessRights.indexOf(${accessRight}):`+accessRights.indexOf(accessRight));
            if ( accessRights.indexOf(accessRight) !== -1){
                allowed=true;
            }

            if (!allowed) {
                 var msg = "Not allowed; Missing accessRight:" + accessRight;
                 $.log.warn(msg);
                 res.status(403).send({ message: msg });
            } else {
                 next(); 
            }                
        });
    }
}

function loadAccessRightFromRoles(userRoles:string[],callback:(accessRights:string[]) => void){   
    fs.exists($.server.rolesFileName,(isFileExisting: boolean) => {
        if (!isFileExisting) {
            callback([]);
        } else {
            fs.readFile($.server.rolesFileName,"utf8", (err: Error, data:string) => {
                if (err) {
                    callback([]);
                } else {
                    let accessRights:string[] = [];
                    let fileRoles : any[] = JSON.parse(data.slice(1)); //I've got an strange caracter at the beginning => slice it
                    
                    //concat all the accessright arrays
                    for ( let userRole of userRoles){
                        let fileRole: any;
                        
                        $.log.debug(`userrole:${userRole}`)                        
                        for ( let tmpFileRole of fileRoles){
                           if ( tmpFileRole.id == userRole){
                               fileRole = tmpFileRole;
                                //How to go out of a for loop?
                           }
                        }
                        
                        if (fileRole){
                            accessRights = accessRights.concat(fileRole.accessrights);
                        }else{
                            $.log.error(`Unknown role:${userRole}`);                            
                        }
                    }
                   $.log.info(`accessright: ${accessRights.toString()} \n allowed for:${userRoles}`  );
                   callback(accessRights);
                }
            });
        }
    });
}