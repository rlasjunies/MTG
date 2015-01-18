declare module ngmd {
    var $mdToast: toastService;

    interface toastService {
        showSimple();
        simple(): toast;
        hide();
        show(toast: any): ng.IPromise<string>;
    }
    interface toastPosition {
        bottom?: boolean;
        top?: boolean;
        left?: boolean;
        right?: boolean;
    }
    interface toast {
        content(content: string): toast;
        position(pos: toastPosition): toast;
        hideDelay(delayms: number): toast;
        action(actionText: string): toast;
    }
    interface toastConf {
        content?: string;
        position?: toastPosition;
        hideDelay?: number;
        action?: string;
        controller?: string;
        templateUrl?: string;
    }
}