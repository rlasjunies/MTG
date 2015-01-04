module app.views.register {
    "use strict";
    export class ValidateEqualsDirective implements ng.IDirective {
        require = "ngModel";
        link = function (scope: ng.IScope, instanceElement: ng.IAugmentedJQuery,
            attrs: ng.IAttributes, controller: ng.INgModelController) {
            function validateEqual(value) {
                /*
                * Take care setupping this directive between the named and other thing
                * I think it should be easier/more maintainable to do directly in the controller itself
                */

                console.log("validateEqual-value:" + value);
                // console.log("validateEqual-attrs["validateEquals"]):" + attrs["validateEquals"]);
                console.log("validateEqual-scope.$eval(attrs['controllerValidateEquals'])):"
                    + scope.$eval(attrs["controllerValidateEquals"]));
                // console.log("validateEqual-controller:" + controller.$name);
                var valid = (value === scope.$eval(attrs["controllerValidateEquals"]));
                // console.log("validateEqual-valid:" + valid);
                // controller.$setValidity("equal", valid);
                console.log("isValid?:" + valid);
                return valid ? value : undefined;
            };

            controller.$parsers.push(validateEqual);
            controller.$formatters.push(validateEqual);

            scope.$watch(attrs["controllerValidateEquals"], function () {
                // console.log("scope.$watch of:" + attrs["controllerValidateEquals"]);
                console.log("scope.$watch of - val of ctlr.password:" + scope.$eval(attrs["controllerValidateEquals"]));
                console.log("scope.$watch of - val of confirmPassword", controller.$viewValue);

                // validateEqual(controller.$viewValue);
                if (controller.$viewValue === scope.$eval(attrs["controllerValidateEquals"])) {
                    controller.$setValidity("equal", true);
                } else {
                    controller.$setValidity("equal", false);
                }
            });
        }

    }
}

angular
    .module("app")
    .directive("x", () => {
    return new app.views.register.ValidateEqualsDirective();
    });
