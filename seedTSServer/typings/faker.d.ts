declare module "faker" { 

    module faker {
        export var locale: string;
        export var helpers: Helpers;
        export var lorem: Lorem;
        export var name: Name;
        export var internet: Internet;

        interface Internet{
            avatar(): string;
            email( firstName?:string, lastName?:string, provider?:string): string;
            userName(firstName?:string, lastName?:string): string;
            domainName(): string;
            domainSuffix(): string;
            domainWord(): string;
            ip(): string;
            userAgent(): string;
            color(baseRed255?: number, baseGreen255?: number, baseBlue255?: number): number;
            password(len?: number, memorable?: boolean, pattern?: string, prefix?: string): string;
            
        }

        interface Name{
            firstName(): string;
            lastName(): string;
            findName(): string;
            prefix(): string;
            suffix(): string;
        }

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