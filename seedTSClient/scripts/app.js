var app;
(function (app) {
    "use strict";
    angular.module("app", [
        "ngMaterial",
        "satellizer",
        "ui.router",
        "ngMessages"
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
            function AuthToken($window, $log) {
                var _this = this;
                this.$window = $window;
                this.$log = $log;
                this.setToken = function (token) {
                    _this.cachedToken = token;
                    _this.storage.setItem(CST_KEY, token);
                    _this.$log.debug("authToken: SetToken");
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
                    _this.$log.debug("remove token");
                };
                this.isAuthenticated = function () {
                    if (_this.getToken() === null) {
                        return false;
                    }
                    return true;
                };
                this.storage = $window.localStorage;
                this.$log.debug("authToken service ... loaded");
            }
            return AuthToken;
        })();
        authentication.AuthToken = AuthToken;
        factory.$inject = [
            "$window",
            "$log"
        ];
        function factory($window, $log) {
            return new app.authentication.AuthToken($window, $log);
        }
        angular.module("app").factory("AuthToken", factory);
    })(authentication = app.authentication || (app.authentication = {}));
})(app || (app = {}));
var app;
(function (app) {
    var services;
    (function (services) {
        "use strict";
        var Config = (function () {
            function Config() {
            }
            return Config;
        })();
        var NotificationService = (function () {
            function NotificationService($mdToast, $log) {
                this.$mdToast = $mdToast;
                this.$log = $log;
                this.toastConfig = new Config();
                this.toastConfig.hideDelay = 1000;
                this.$log.debug("notificationService ... loaded");
            }
            NotificationService.prototype.success = function (message, title) {
                if (title === undefined) {
                    title = "";
                }
                var toast = this.$mdToast.simple().content(message).hideDelay(1000);
                this.$mdToast.show(toast);
            };
            NotificationService.prototype.error = function (message, title) {
                if (title === undefined) {
                    title = "";
                }
                var toast = this.$mdToast.simple().content(message).hideDelay(1000);
                this.$mdToast.show(toast);
            };
            NotificationService.prototype.info = function (message, title) {
                if (title === undefined) {
                    title = "";
                }
                var toast = this.$mdToast.simple().content(message).hideDelay(1000);
                this.$mdToast.show(toast);
            };
            NotificationService.prototype.warning = function (message, title) {
                if (title === undefined) {
                    title = "";
                }
                var toast = this.$mdToast.simple().content(message).hideDelay(1000);
                this.$mdToast.show(toast);
            };
            return NotificationService;
        })();
        services.NotificationService = NotificationService;
        factory.$inject = [
            "$mdToast",
            "$log"
        ];
        function factory($mdToast, $log) {
            return new app.services.NotificationService($mdToast, $log);
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
            function AuthInterceptor($auth) {
                var _this = this;
                this.$auth = $auth;
                this.request = function (config) {
                    var token = _this.$auth.getToken();
                    if (token) {
                        config.headers.Authorization = "Bearer " + token;
                    }
                    return config;
                };
                this.response = function (response) {
                    return response;
                };
            }
            return AuthInterceptor;
        })();
        authentication.AuthInterceptor = AuthInterceptor;
        factory.$inject = [
            "$auth"
        ];
        function factory($auth) {
            return new app.authentication.AuthInterceptor($auth);
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
                function HeaderController($scope, $auth, $log) {
                    var _this = this;
                    this.$scope = $scope;
                    this.$auth = $auth;
                    this.$log = $log;
                    this.isAuthenticated = function () {
                        return _this.$auth.isAuthenticated();
                    };
                    this.isAuthenticated = this.$auth.isAuthenticated;
                    this.$log.debug("HeaderController: Constructor");
                }
                HeaderController.$inject = [
                    "$scope",
                    "$auth",
                    "$log"
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
        var paints;
        (function (_paints) {
            "use strict";
            var PaintsController = (function () {
                function PaintsController($scope, $http, CST_API_URL, NotificationService, $log) {
                    var _this = this;
                    this.$scope = $scope;
                    this.$http = $http;
                    this.CST_API_URL = CST_API_URL;
                    this.NotificationService = NotificationService;
                    this.$log = $log;
                    this.paints = [];
                    $http.get(this.CST_API_URL + "/paints").error(function (err) {
                        _this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot load paints resources:");
                        _this.NotificationService.error("Error message: \n" + JSON.stringify(err), "Cannot load paints resources:");
                    }).success(function (paints) {
                        _this.paints = paints;
                        _this.$log.debug("paints loaded!");
                    });
                    this.$log.debug("PaintsController: Constructor");
                }
                PaintsController.$inject = [
                    "$scope",
                    "$http",
                    "CST_API_URL",
                    "NotificationService",
                    "$log"
                ];
                return PaintsController;
            })();
            _paints.PaintsController = PaintsController;
            angular.module("app").controller("app.views.paints.PaintsController", app.views.paints.PaintsController);
        })(paints = views.paints || (views.paints = {}));
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
                function LoginController($rootScope, NotificationService, $state, $auth, $log) {
                    var _this = this;
                    this.$rootScope = $rootScope;
                    this.NotificationService = NotificationService;
                    this.$state = $state;
                    this.$auth = $auth;
                    this.$log = $log;
                    this.submit = function () {
                        _this.$auth.login({ email: _this.email, password: _this.password }).then(function (response) {
                            _this.$log.debug("login is fine!");
                            var msg = "Thanks '" + response.data.user.email + "'for coming back!";
                            _this.NotificationService.success(msg);
                            if (!response.data.user.active) {
                                msg = "Do not forget to active your account via the email sent!";
                                _this.NotificationService.warning(msg);
                            }
                            _this.$rootScope.$broadcast("userupdated");
                            _this.$state.go("main");
                        }).catch(function (err) {
                            _this.$log.error("login:" + JSON.stringify(err));
                            _this.NotificationService.error("Error registering!");
                            _this.$rootScope.$broadcast("userupdated");
                        });
                    };
                    this.authenticate = function (provider) {
                        _this.$auth.authenticate(provider).then(function (response) {
                            _this.$log.debug("login is fine!");
                            _this.NotificationService.success("U are logged!");
                            _this.$rootScope.$broadcast("userupdated");
                            _this.$state.go("main");
                        }).catch(function (err) {
                            _this.$log.error("login:" + JSON.stringify(err));
                            _this.NotificationService.error("Error registering!");
                            _this.$rootScope.$broadcast("userupdated");
                        });
                    };
                    this.$log.debug("LoginController: Constructor");
                }
                LoginController.$inject = [
                    "$rootScope",
                    "NotificationService",
                    "$state",
                    "$auth",
                    "$log"
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
                function LogoutController($rootScope, $auth, $state, NotificationService, $log) {
                    this.$rootScope = $rootScope;
                    this.$auth = $auth;
                    this.$state = $state;
                    this.NotificationService = NotificationService;
                    this.$log = $log;
                    this.$auth.logout();
                    this.$rootScope.$broadcast("userupdated");
                    this.$state.go("main");
                    NotificationService.info("You are now logout!", "Authentication message");
                    this.$log.debug("LogoutController: Constructor");
                }
                LogoutController.$inject = [
                    "$rootScope",
                    "$auth",
                    "$state",
                    "NotificationService",
                    "$log"
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
                function RegisterController($rootScope, $scope, NotificationService, $auth, $state, $log) {
                    var _this = this;
                    this.$rootScope = $rootScope;
                    this.$scope = $scope;
                    this.NotificationService = NotificationService;
                    this.$auth = $auth;
                    this.$state = $state;
                    this.$log = $log;
                    this.checkPasswords = function () {
                        _this.$scope["register"]["password_confirm"].$setValidity("equal", (_this.password === _this.passwordConfirm));
                    };
                    this.submit = function () {
                        _this.$auth.signup({ email: _this.email, password: _this.password }).then(function (response) {
                            _this.$log.info("registration is fine!");
                            var msg = "Dear '" + response.data.user.email + "' you are now registered!. Goes in your mailbox to confirm your email address " + " within 12 hours.";
                            _this.NotificationService.success(msg);
                            _this.$scope.$broadcast("userupdated");
                            _this.$state.go("main");
                        }).catch(function (err) {
                            _this.$log.error("registration is wrong bad:" + JSON.stringify(err));
                            _this.NotificationService.error("Error registering!" + JSON.stringify(err));
                            _this.$scope.$broadcast("userupdated");
                        });
                    };
                    this.password = "";
                    this.passwordConfirm = "";
                    this.$scope.$watch(function () { return _this.password; }, this.checkPasswords);
                    this.$scope.$watch(function () { return _this.passwordConfirm; }, this.checkPasswords);
                    this.$log.debug("RegisterController: Constructor");
                }
                RegisterController.$inject = [
                    "$rootScope",
                    "$scope",
                    "NotificationService",
                    "$auth",
                    "$state",
                    "$log"
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
                            var valid = (value === scope.$eval(attrs["controllerValidateEquals"]));
                            return valid ? value : undefined;
                        }
                        ;
                        controller.$parsers.push(validateEqual);
                        controller.$formatters.push(validateEqual);
                        scope.$watch(attrs["controllerValidateEquals"], function () {
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
        var index;
        (function (index) {
            "use strict";
            var IndexController = (function () {
                function IndexController($scope, $auth, $mdSidenav, $log) {
                    var _this = this;
                    this.$scope = $scope;
                    this.$auth = $auth;
                    this.$mdSidenav = $mdSidenav;
                    this.$log = $log;
                    this.toggleLeft = function () {
                        _this.$mdSidenav("left").toggle().then(function () {
                            _this.$log.debug("toggle left is done");
                        });
                    };
                    this.toggleRight = function () {
                        _this.$mdSidenav("right").toggle().then(function () {
                            _this.$log.debug("toggle RIGHT is done");
                        });
                    };
                    this.$log.debug("IndexController: Constructor");
                    $scope.$on("userupdated", function (event) {
                        _this.isAuthenticated = _this.$auth.isAuthenticated();
                    });
                }
                IndexController.$inject = [
                    "$scope",
                    "$auth",
                    "$mdSidenav",
                    "$log"
                ];
                return IndexController;
            })();
            index.IndexController = IndexController;
            angular.module("app").controller("app.views.index.IndexController", app.views.index.IndexController);
        })(index = views.index || (views.index = {}));
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
                function MainController($log) {
                    this.$log = $log;
                    this.$log.debug("MainController: Constructor");
                }
                MainController.$inject = [
                    "$log"
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
        var paints;
        (function (paints) {
            "use strict";
            route.$inject = [
                "$stateProvider"
            ];
            function route($stateProvider) {
                $stateProvider.state("paints", {
                    url: "/paints",
                    templateUrl: "app/views/paints/paints.html",
                    controller: "app.views.paints.PaintsController",
                    controllerAs: "vm"
                });
            }
            ;
            angular.module("app").config(route);
        })(paints = views.paints || (views.paints = {}));
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
        var sidenav;
        (function (sidenav) {
            "use strict";
            var SidenavController = (function () {
                function SidenavController($scope, $auth, $mdSidenav, $log) {
                    this.$scope = $scope;
                    this.$auth = $auth;
                    this.$mdSidenav = $mdSidenav;
                    this.$log = $log;
                    this.isAuthenticated = this.$auth.isAuthenticated;
                    this.$log.debug("SidenavController: Constructor");
                }
                SidenavController.prototype.close = function () {
                    var _this = this;
                    this.$mdSidenav("left").close().then(function () {
                        _this.$log.debug("toggle left is done");
                    });
                };
                SidenavController.$inject = [
                    "$scope",
                    "$auth",
                    "$mdSidenav",
                    "$log"
                ];
                return SidenavController;
            })();
            sidenav.SidenavController = SidenavController;
            angular.module("app").controller("app.views.sidenav.SidenavController", app.views.sidenav.SidenavController);
        })(sidenav = views.sidenav || (views.sidenav = {}));
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