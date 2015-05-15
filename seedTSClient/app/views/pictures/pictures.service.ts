module app.pictures {
    "use strict";
    export var picturesService_StringName = "picturesService";

    export interface IPicturesService {
        getAll(): ng.IPromise<IPictures>;
        delete(uniqueId: string): ng.IPromise<IPicture>;
    }

    export interface IPicture {
        //fileName: string;
        string;
    }

    export interface IPictures {
        //[index: number]: String;
        //pictures: IPicture[];
        [index: number]: IPicture;
    }

    class PicturesService implements IPicturesService {
        static $inject = ["$http"];

        constructor(private $http: ng.IHttpService) {
        }

        getAll(): ng.IPromise<IPictures> {
            return this.$http.get("/api/pictures")
                .then((response: ng.IHttpPromiseCallbackArg<IPictures>): IPictures => {
                    return <IPictures>response.data;
            });
        }

        delete(fileNameToDelete: string): ng.IPromise<IPicture> {
            return this.$http.delete("/api/pictures/" + fileNameToDelete).then((response: ng.IHttpPromiseCallbackArg<IPicture>): IPicture => {
                return <IPicture> response.data;
            });
        }
    }

    angular
        .module("app")
        .service(app.pictures.picturesService_StringName, PicturesService);
}