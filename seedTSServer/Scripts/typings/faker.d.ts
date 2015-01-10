declare module "faker" { 

    module faker {
        export var locale: string;
        export var helpers: Helpers;
        export var lorem: Lorem;

        interface Lorem {
            words(): string;
            sentence(): string;
            sentences(): string;
            paragraph(): string;
            paragraphs(): string;
        }
        interface Helpers {
            contextualCard(): string;
        }

        //export interface faker{
        //    locale: string;
        //    helpers: Helpers
        //}
    }

    //function f(): faker.Faker;
    export = faker;
}