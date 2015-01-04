var app;
(function (app) {
    "use strict";
    angular.module("app", [
        "satellizer",
        "ui.router"
    ]);
})(app || (app = {}));
var app;
(function (app) {
    var config;
    (function (_config) {
        var auth;
        (function (auth) {
            "use strict";
            config.$inject = [
                "$authProvider",
                "CST_AUTH_URL"
            ];
            function config($authProvider, CST_AUTH_URL) {
                $authProvider.google({
                    clientId: "149876745472-k3ubq3pbtll17pmuohdjfom0fpinklmc.apps.googleusercontent.com",
                    url: CST_AUTH_URL + "/google",
                });
                $authProvider.facebook({
                    clientId: "1608138689408302",
                    url: CST_AUTH_URL + "/facebook",
                });
                $authProvider.loginUrl = CST_AUTH_URL + "/login";
                $authProvider.signupUrl = CST_AUTH_URL + "/register";
            }
            angular.module("app").config(config);
        })(auth = _config.auth || (_config.auth = {}));
    })(config = app.config || (app.config = {}));
})(app || (app = {}));
var app;
(function (app) {
    var config;
    (function (_config) {
        "use strict";
        config.$inject = ["$locationProvider"];
        function config($locationProvider) {
            $locationProvider.html5Mode(true);
        }
        angular.module("app").config(config);
    })(config = app.config || (app.config = {}));
})(app || (app = {}));
var app;
(function (app) {
    var constants;
    (function (constants) {
        "use strict";
        angular.module("app").constant("CST_URL", "http://localhost:3000/").constant("CST_API_URL", "http://localhost:3000/api").constant("CST_AUTH_URL", "http://localhost:3000/auth");
    })(constants = app.constants || (app.constants = {}));
})(app || (app = {}));
var app;
(function (app) {
    var values;
    (function (values) {
        "use strict";
        var currentUser = {
            userId: "",
            isAuthenticate: false
        };
        angular.module("app").value("valCurrentUser", currentUser);
    })(values = app.values || (app.values = {}));
})(app || (app = {}));
var app;
(function (app) {
    var authentication;
    (function (authentication) {
        "use strict";
    })(authentication = app.authentication || (app.authentication = {}));
})(app || (app = {}));
var app;
(function (app) {
    var authentication;
    (function (authentication) {
        "use strict";
        var CST_KEY = "TOKEN";
        var AuthToken = (function () {
            function AuthToken($window) {
                var _this = this;
                this.setToken = function (token) {
                    _this.cachedToken = token;
                    _this.storage.setItem(CST_KEY, token);
                };
                this.getToken = function () {
                    if (!_this.cachedToken) {
                        _this.cachedToken = _this.storage.getItem(CST_KEY);
                    }
                    return _this.cachedToken;
                };
                this.remove = function () {
                    _this.cachedToken = null;
                    _this.storage.removeItem(CST_KEY);
                };
                this.isAuthenticated = function () {
                    if (_this.getToken() === null) {
                        return false;
                    }
                    return true;
                };
                this.storage = $window.localStorage;
                console.log("notificationService ... loaded");
            }
            return AuthToken;
        })();
        authentication.AuthToken = AuthToken;
        factory.$inject = [
            "$window"
        ];
        function factory($window) {
            return new app.authentication.AuthToken($window);
        }
        angular.module("app").factory("AuthToken", factory);
    })(authentication = app.authentication || (app.authentication = {}));
})(app || (app = {}));
var app;
(function (app) {
    var services;
    (function (services) {
        "use strict";
        var NotificationService = (function () {
            function NotificationService() {
                console.log("notificationService ... loaded");
                toastr.options = {
                    "positionClass": "toast-bottom-right",
                };
            }
            NotificationService.prototype.success = function (message, title) {
                if (title === undefined) {
                    title = "";
                }
                toastr.success(message, title);
            };
            NotificationService.prototype.error = function (message, title) {
                if (title === undefined) {
                    title = "";
                }
                toastr.error(message, title);
            };
            NotificationService.prototype.info = function (message, title) {
                if (title === undefined) {
                    title = "";
                }
                toastr.info(message, title);
            };
            NotificationService.prototype.warning = function (message, title) {
                if (title === undefined) {
                    title = "";
                }
                toastr.warning(message, title);
            };
            return NotificationService;
        })();
        services.NotificationService = NotificationService;
        factory.$inject = [];
        function factory() {
            return new app.services.NotificationService();
        }
        angular.module("app").factory("NotificationService", factory);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
var app;
(function (app) {
    var services;
    (function (services) {
        "use strict";
        var SiteSettingsService = (function () {
            function SiteSettingsService($http, CST_API_URL) {
                this.$http = $http;
                this.CST_API_URL = CST_API_URL;
            }
            SiteSettingsService.prototype.getSettings = function () {
                return this.$http.get(this.CST_API_URL + "/site").then(function (response) {
                    return response.data;
                });
            };
            SiteSettingsService.prototype.updateSettings = function (siteSettings) {
                throw new Error("not implemented yet!");
            };
            SiteSettingsService.prototype.getThemes = function () {
                return this.$http.get(this.CST_API_URL + "/themes").then(function (response) {
                    return response.data;
                });
            };
            return SiteSettingsService;
        })();
        factory.$inject = [
            "$http",
            "CST_API_URL"
        ];
        function factory($http, CST_API_URL) {
            return new SiteSettingsService($http, CST_API_URL);
        }
        angular.module("app").factory("app.services.SiteSettingsService", factory);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
var app;
(function (app) {
    var services;
    (function (services) {
        "use strict";
        var UserService = (function () {
            function UserService($http) {
                this.$http = $http;
            }
            UserService.prototype.getById = function (uniqueId) {
                return this.$http.get("/api/users/" + uniqueId).then(function (response) {
                    return response.data;
                });
            };
            UserService.$inject = ["$http"];
            return UserService;
        })();
        angular.module("app").service("app.services.UserService", UserService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
var app;
(function (app) {
    var authentication;
    (function (authentication) {
        "use strict";
        var AuthInterceptor = (function () {
            function AuthInterceptor(AuthToken) {
                var _this = this;
                this.request = function (config) {
                    var token = _this.authToken.getToken();
                    if (token) {
                        config.headers.Authorization = "Bearer " + token;
                    }
                    return config;
                };
                this.response = function (response) {
                    return response;
                };
                this.authToken = AuthToken;
            }
            return AuthInterceptor;
        })();
        authentication.AuthInterceptor = AuthInterceptor;
        factory.$inject = [
            "AuthToken"
        ];
        function factory(AuthToken) {
            return new app.authentication.AuthInterceptor(AuthToken);
        }
        ;
    })(authentication = app.authentication || (app.authentication = {}));
})(app || (app = {}));
var app;
(function (app) {
    var run;
    (function (_run) {
        "use strict";
        angular.module("app").run(run);
        run.$inject = [
            "$rootScope",
        ];
        function run($rootScope) {
            $rootScope.$on("$routeChangeError", function () {
                alert("routeChangeError raised!");
            });
        }
    })(run = app.run || (app.run = {}));
})(app || (app = {}));
var app;
(function (app) {
    var views;
    (function (views) {
        var header;
        (function (header) {
            "use strict";
            var HeaderController = (function () {
                function HeaderController($scope, $auth) {
                    this.$scope = $scope;
                    this.$auth = $auth;
                    this.isAuthenticated = this.$auth.isAuthenticated;
                    console.log("HeaderController: Constructor");
                }
                HeaderController.$inject = [
                    "$scope",
                    "$auth"
                ];
                return HeaderController;
            })();
            header.HeaderController = HeaderController;
            angular.module("app").controller("app.views.header.HeaderController", app.views.header.HeaderController);
        })(header = views.header || (views.header = {}));
    })(views = app.views || (app.views = {}));
})(app || (app = {}));
var app;
(function (app) {
    var views;
    (function (views) {
        var jobs;
        (function (_jobs) {
            "use strict";
            var JobsController = (function () {
                function JobsController($scope, $http, CST_API_URL, NotificationService) {
                    var _this = this;
                    this.$scope = $scope;
                    this.$http = $http;
                    this.CST_API_URL = CST_API_URL;
                    this.NotificationService = NotificationService;
                    this.jobs = [];
                    $http.get(this.CST_API_URL + "/jobs").error(function (err) {
                        _this.NotificationService.error("Error message: \n" + JSON.stringify(err), "Cannot load jobs resources:");
                    }).success(function (jobs) {
                        _this.jobs = jobs;
                    });
                    console.log("JobsController: Constructor");
                    console.log(JSON.stringify(this.jobs));
                }
                JobsController.$inject = [
                    "$scope",
                    "$http",
                    "CST_API_URL",
                    "NotificationService"
                ];
                return JobsController;
            })();
            _jobs.JobsController = JobsController;
            angular.module("app").controller("app.views.jobs.JobsController", app.views.jobs.JobsController);
        })(jobs = views.jobs || (views.jobs = {}));
    })(views = app.views || (app.views = {}));
})(app || (app = {}));
var app;
(function (app) {
    var views;
    (function (views) {
        var login;
        (function (login) {
            "use strict";
            ;
            var LoginController = (function () {
                function LoginController($rootScope, NotificationService, $state, $auth) {
                    var _this = this;
                    this.$rootScope = $rootScope;
                    this.NotificationService = NotificationService;
                    this.$state = $state;
                    this.$auth = $auth;
                    this.submit = function () {
                        _this.$auth.login({ email: _this.email, password: _this.password }).then(function (response) {
                            var msg = "Thanks '" + response.data.user.email + "'for coming back!";
                            _this.NotificationService.success(msg);
                            if (!response.data.user.active) {
                                msg = "Do not forget to active your account via the email sent!";
                                _this.NotificationService.warning(msg);
                            }
                            _this.$rootScope.$broadcast("userupdated");
                            _this.$state.go("main");
                        }).catch(function (err) {
                            console.log("login:" + JSON.stringify(err));
                            _this.NotificationService.error("Error registering!");
                            _this.$rootScope.$broadcast("userupdated");
                        });
                    };
                    this.authenticate = function (provider) {
                        _this.$auth.authenticate(provider).then(function (response) {
                            console.log("login is fine!");
                            _this.NotificationService.success("U are logged!");
                            _this.$rootScope.$broadcast("userupdated");
                            _this.$state.go("main");
                        }).catch(function (err) {
                            console.log("login:" + JSON.stringify(err));
                            _this.NotificationService.error("Error registering!");
                            _this.$rootScope.$broadcast("userupdated");
                        });
                    };
                    console.log("LoginController: Constructor");
                }
                LoginController.$inject = [
                    "$rootScope",
                    "NotificationService",
                    "$state",
                    "$auth"
                ];
                return LoginController;
            })();
            login.LoginController = LoginController;
            angular.module("app").controller("app.views.login.LoginController", app.views.login.LoginController);
        })(login = views.login || (views.login = {}));
    })(views = app.views || (app.views = {}));
})(app || (app = {}));
var app;
(function (app) {
    var views;
    (function (views) {
        var logout;
        (function (logout) {
            "use strict";
            var LogoutController = (function () {
                function LogoutController($rootScope, $auth, $state, NotificationService) {
                    this.$rootScope = $rootScope;
                    this.$auth = $auth;
                    this.$state = $state;
                    this.NotificationService = NotificationService;
                    console.log("LogoutController: Constructor");
                    this.$auth.logout();
                    this.$rootScope.$broadcast("userupdated");
                    this.$state.go("main");
                    NotificationService.info("You are now logout!", "Authentication message");
                }
                LogoutController.$inject = [
                    "$rootScope",
                    "$auth",
                    "$state",
                    "NotificationService"
                ];
                return LogoutController;
            })();
            logout.LogoutController = LogoutController;
            angular.module("app").controller("app.views.logout.LogoutController", app.views.logout.LogoutController);
        })(logout = views.logout || (views.logout = {}));
    })(views = app.views || (app.views = {}));
})(app || (app = {}));
var app;
(function (app) {
    var views;
    (function (views) {
        var register;
        (function (register) {
            "use strict";
            ;
            var RegisterController = (function () {
                function RegisterController($rootScope, $scope, NotificationService, $auth, $state) {
                    var _this = this;
                    this.$rootScope = $rootScope;
                    this.$scope = $scope;
                    this.NotificationService = NotificationService;
                    this.$auth = $auth;
                    this.$state = $state;
                    this.checkPasswords = function () {
                        _this.$scope["register"]["password_confirm"].$setValidity("equal", (_this.password === _this.passwordConfirm));
                    };
                    this.submit = function () {
                        _this.$auth.signup({ email: _this.email, password: _this.password }).then(function (response) {
                            var msg = "Dear '" + response.data.user.email + "' you are now registered!. Goes in your mailbox to confirm your email address " + " within 12 hours.";
                            _this.NotificationService.success(msg);
                            _this.$scope.$broadcast("userupdated");
                            _this.$state.go("main");
                        }).catch(function (err) {
                            console.log("bad");
                            _this.NotificationService.error("Error registering!" + JSON.stringify(err));
                            _this.$scope.$broadcast("userupdated");
                        });
                    };
                    this.password = "";
                    this.passwordConfirm = "";
                    this.$scope.$watch(function () { return _this.password; }, this.checkPasswords);
                    this.$scope.$watch(function () { return _this.passwordConfirm; }, this.checkPasswords);
                    console.log("RegisterController: Constructor");
                }
                RegisterController.$inject = [
                    "$rootScope",
                    "$scope",
                    "NotificationService",
                    "$auth",
                    "$state"
                ];
                return RegisterController;
            })();
            register.RegisterController = RegisterController;
            angular.module("app").controller("app.views.register.RegisterController", app.views.register.RegisterController);
        })(register = views.register || (views.register = {}));
    })(views = app.views || (app.views = {}));
})(app || (app = {}));
var app;
(function (app) {
    var views;
    (function (views) {
        var register;
        (function (register) {
            "use strict";
            var ValidateEqualsDirective = (function () {
                function ValidateEqualsDirective() {
                    this.require = "ngModel";
                    this.link = function (scope, instanceElement, attrs, controller) {
                        function validateEqual(value) {
                            console.log("validateEqual-value:" + value);
                            console.log("validateEqual-scope.$eval(attrs['controllerValidateEquals'])):" + scope.$eval(attrs["controllerValidateEquals"]));
                            var valid = (value === scope.$eval(attrs["controllerValidateEquals"]));
                            console.log("isValid?:" + valid);
                            return valid ? value : undefined;
                        }
                        ;
                        controller.$parsers.push(validateEqual);
                        controller.$formatters.push(validateEqual);
                        scope.$watch(attrs["controllerValidateEquals"], function () {
                            console.log("scope.$watch of - val of ctlr.password:" + scope.$eval(attrs["controllerValidateEquals"]));
                            console.log("scope.$watch of - val of confirmPassword", controller.$viewValue);
                            if (controller.$viewValue === scope.$eval(attrs["controllerValidateEquals"])) {
                                controller.$setValidity("equal", true);
                            }
                            else {
                                controller.$setValidity("equal", false);
                            }
                        });
                    };
                }
                return ValidateEqualsDirective;
            })();
            register.ValidateEqualsDirective = ValidateEqualsDirective;
        })(register = views.register || (views.register = {}));
    })(views = app.views || (app.views = {}));
})(app || (app = {}));
angular.module("app").directive("x", function () {
    return new app.views.register.ValidateEqualsDirective();
});
var app;
(function (app) {
    var route;
    (function (_route) {
        "use strict";
        route.$inject = [
            "$urlRouterProvider"
        ];
        function route($urlRouterProvider) {
            $urlRouterProvider.otherwise("/");
        }
        ;
        angular.module("app").config(route);
    })(route = app.route || (app.route = {}));
})(app || (app = {}));
var app;
(function (app) {
    var views;
    (function (views) {
        var jobs;
        (function (jobs) {
            "use strict";
            route.$inject = [
                "$stateProvider"
            ];
            function route($stateProvider) {
                $stateProvider.state("jobs", {
                    url: "/jobs",
                    templateUrl: "app/views/jobs/jobs.html",
                    controller: "app.views.jobs.JobsController",
                    controllerAs: "vm"
                });
            }
            ;
            angular.module("app").config(route);
        })(jobs = views.jobs || (views.jobs = {}));
    })(views = app.views || (app.views = {}));
})(app || (app = {}));
var app;
(function (app) {
    var views;
    (function (views) {
        var login;
        (function (login) {
            "use strict";
            route.$inject = [
                "$stateProvider"
            ];
            function route($stateProvider) {
                $stateProvider.state("login", {
                    url: "/login",
                    templateUrl: "app/views/login/login.html",
                    controller: "app.views.login.LoginController",
                    controllerAs: "vm"
                });
            }
            ;
            angular.module("app").config(route);
        })(login = views.login || (views.login = {}));
    })(views = app.views || (app.views = {}));
})(app || (app = {}));
var app;
(function (app) {
    var views;
    (function (views) {
        var logout;
        (function (logout) {
            "use strict";
            route.$inject = [
                "$stateProvider"
            ];
            function route($stateProvider) {
                $stateProvider.state("logout", {
                    url: "/logout",
                    controller: "app.views.logout.LogoutController",
                    controllerAs: "vm"
                });
            }
            ;
            angular.module("app").config(route);
        })(logout = views.logout || (views.logout = {}));
    })(views = app.views || (app.views = {}));
})(app || (app = {}));
var app;
(function (app) {
    var views;
    (function (views) {
        var main;
        (function (main) {
            "use strict";
            var MainController = (function () {
                function MainController() {
                    console.log("MainController: Constructor");
                }
                MainController.$inject = [
                ];
                return MainController;
            })();
            main.MainController = MainController;
            angular.module("app").controller("app.views.main.MainController", app.views.main.MainController);
        })(main = views.main || (views.main = {}));
    })(views = app.views || (app.views = {}));
})(app || (app = {}));
var app;
(function (app) {
    var views;
    (function (views) {
        var main;
        (function (main) {
            "use strict";
            route.$inject = [
                "$stateProvider"
            ];
            function route($stateProvider) {
                $stateProvider.state("main", {
                    url: "/",
                    templateUrl: "app/views/main/main.html",
                    controller: "app.views.main.MainController",
                    controllerAs: "vm"
                });
            }
            ;
            angular.module("app").config(route);
        })(main = views.main || (views.main = {}));
    })(views = app.views || (app.views = {}));
})(app || (app = {}));
var app;
(function (app) {
    var views;
    (function (views) {
        var register;
        (function (register) {
            "use strict";
            route.$inject = [
                "$stateProvider"
            ];
            function route($stateProvider) {
                $stateProvider.state("register", {
                    url: "/register",
                    templateUrl: "app/views/register/register.html",
                    controller: "app.views.register.RegisterController",
                    controllerAs: "vm"
                });
            }
            ;
            angular.module("app").config(route);
        })(register = views.register || (views.register = {}));
    })(views = app.views || (app.views = {}));
})(app || (app = {}));
var app;
(function (app) {
    var views;
    (function (views) {
        var sitesettings;
        (function (sitesettings) {
            "use strict";
            var SiteSettingsController = (function () {
                function SiteSettingsController(siteSettings, siteSettingsService) {
                    this.siteSettingsService = siteSettingsService;
                    this.themeNames = [];
                    this.siteSettings = siteSettings;
                    this.themeNames = siteSettings.availableThemeNames;
                }
                SiteSettingsController.prototype.save = function () {
                    throw new Error("Not implemented yet!");
                };
                SiteSettingsController.$inject = [
                    "siteSettings",
                    "app.services.SiteSettingsService"
                ];
                return SiteSettingsController;
            })();
            sitesettings.SiteSettingsController = SiteSettingsController;
            angular.module("app").controller("app.sitesettings.SiteSettingsController", app.views.sitesettings.SiteSettingsController);
        })(sitesettings = views.sitesettings || (views.sitesettings = {}));
    })(views = app.views || (app.views = {}));
})(app || (app = {}));
var app;
(function (app) {
    var sitesettings;
    (function (sitesettings) {
        "use strict";
        angular.module("app.sitesettings", []);
    })(sitesettings = app.sitesettings || (app.sitesettings = {}));
})(app || (app = {}));
var app;
(function (app) {
    var sitesettings;
    (function (sitesettings) {
        "use strict";
        angular.module("app.sitesettings").config([
            "$routeProvider",
            "$locationProvider",
            config
        ]);
        function config($routeProvider, $locationProvider) {
            $routeProvider.when("/admin/sitesettings", {
                templateUrl: "app/views/sitesettings/sitesettings.html",
                controller: "app.views.sitesettings.SiteSettingsController",
                controllerAs: "vm",
                resolve: {
                    siteSettings: siteSettingsResolve
                }
            });
        }
        siteSettingsResolve.$inject = ["app.services.SiteSettingsService"];
        function siteSettingsResolve(siteSettingsService) {
            return siteSettingsService.getSettings().then(function (siteSettings) {
                return siteSettingsService.getThemes().then(function (themeNames) {
                    siteSettings.availableThemeNames = themeNames;
                    return siteSettings;
                });
            });
        }
    })(sitesettings = app.sitesettings || (app.sitesettings = {}));
})(app || (app = {}));
//# sourceMappingURL=app.js.map