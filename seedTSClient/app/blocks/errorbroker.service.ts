module enhancedErrorLogging {
    'use strict';

    export interface IErrorLogger {
        log(error: string): void;
    }

    export interface IErrorBroker {
        log(error: string): void;
        registerLogger(errorLogger: IErrorLogger): void;
    }

    class ErrorBroker implements IErrorBroker {
        log(error: string): void { }
        registerLogger(errorLogger: IErrorLogger): void { }
    }

    angular
        .module('app.blocks')
        .service('app.blocks.ErrorBroker', ErrorBroker);
}