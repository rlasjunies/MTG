declare module "mongoose" {
    export interface Collection {
        drop(success:Function, error:Function);
    }
    export interface Document {
        _doc: any;
        __v: number;
    }
}
