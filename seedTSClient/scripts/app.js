var app;
(function (app) {
    "use strict";
    angular.module("app", [
        "ngMaterial",
        "satellizer",
        "ui.router",
        "ngMessages",
        "angular-loading-bar",
        "ngAnimate",
        "angularFileUpload"
    ]);
})(app || (app = {}));
var app;
(function (app) {
    var constants;
    (function (constants) {
        "use strict";
        angular.module("app").constant("CST_URL", window.location.protocol + "//" + window.location.host + "/").constant("CST_API_URL", window.location.protocol + "//" + window.location.host + "/api").constant("CST_AUTH_URL", window.location.protocol + "//" + window.location.host + "/auth");
    })(constants = app.constants || (app.constants = {}));
})(app || (app = {}));
var app;
(function (app) {
    var config;
    (function (_config) {
        "use strict";
        config.$inject = ["$locationProvider"];
        function config($locationProvider) {
            $locationProvider.html5Mode(true);
            console.log("window.location@config:" + window.location.protocol + "//" + window.location.host);
            angular.module("app").constant("CST_URL", window.location.protocol + "//" + window.location.host + "/").constant("CST_API_URL", window.location.protocol + "//" + window.location.host + "/api").constant("CST_AUTH_URL", window.location.protocol + "//" + window.location.host + "/auth");
        }
        angular.module("app").config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
            cfpLoadingBarProvider.includeSpinner = false;
        }]);
        angular.module("app").config(config);
    })(config = app.config || (app.config = {}));
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
                "$locationProvider"
            ];
            function config($authProvider, $locationProvider) {
                var urlAuth = window.location.protocol + "//" + window.location.host + "/auth";
                console.log("urlAuth" + urlAuth);
                $authProvider.google({
                    clientId: "149876745472-k3ubq3pbtll17pmuohdjfom0fpinklmc.apps.googleusercontent.com",
                    url: urlAuth + "/google",
                });
                $authProvider.facebook({
                    clientId: "1608138689408302",
                    url: urlAuth + "/facebook",
                });
                $authProvider.loginUrl = urlAuth + "/login";
                $authProvider.signupUrl = urlAuth + "/register";
            }
            angular.module("app").config(config);
        })(auth = _config.auth || (_config.auth = {}));
    })(config = app.config || (app.config = {}));
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
    var users;
    (function (users) {
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
        users.NotificationService = NotificationService;
        factory.$inject = [
            "$mdToast",
            "$log"
        ];
        function factory($mdToast, $log) {
            return new app.users.NotificationService($mdToast, $log);
        }
        angular.module("app").factory("NotificationService", factory);
    })(users = app.users || (app.users = {}));
})(app || (app = {}));
var app;
(function (app) {
    var users;
    (function (users) {
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
    })(users = app.users || (app.users = {}));
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
    var header;
    (function (header) {
        "use strict";
        header.headerTemplate_StringName = "app/header/header.html";
        header.headerController_StringName = "app.header.HeaderController";
        var HeaderConfiguration = (function () {
            function HeaderConfiguration(headerTitle, headerButtonMenuActivated, headerButtonBackActivated, headerButtonLoginActivated, headerButtonAddActivated, headerButtonSaveActivated, headerButtonDeleteActivated) {
                if (headerTitle === void 0) { headerTitle = ""; }
                if (headerButtonMenuActivated === void 0) { headerButtonMenuActivated = false; }
                if (headerButtonBackActivated === void 0) { headerButtonBackActivated = false; }
                if (headerButtonLoginActivated === void 0) { headerButtonLoginActivated = false; }
                if (headerButtonAddActivated === void 0) { headerButtonAddActivated = false; }
                if (headerButtonSaveActivated === void 0) { headerButtonSaveActivated = false; }
                if (headerButtonDeleteActivated === void 0) { headerButtonDeleteActivated = false; }
                this.headerTitle = headerTitle;
                this.headerButtonMenuActivated = headerButtonMenuActivated;
                this.headerButtonBackActivated = headerButtonBackActivated;
                this.headerButtonLoginActivated = headerButtonLoginActivated;
                this.headerButtonAddActivated = headerButtonAddActivated;
                this.headerButtonSaveActivated = headerButtonSaveActivated;
                this.headerButtonDeleteActivated = headerButtonDeleteActivated;
            }
            return HeaderConfiguration;
        })();
        header.HeaderConfiguration = HeaderConfiguration;
        var HeaderController = (function () {
            function HeaderController($rootScope, $scope, $log) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.$scope = $scope;
                this.$log = $log;
                this.$log.debug(app.header.headerController_StringName + "loaded!");
                this.invalid = false;
                this.cleanUpFunc1 = this.$rootScope.$on(appRootScopeEvent.invalidForm, function () {
                    _this.invalid = true;
                });
                this.cleanUpFunc2 = this.$rootScope.$on(appRootScopeEvent.validForm, function () {
                    _this.invalid = false;
                });
                $scope.$on('$destroy', function () {
                    _this.cleanUpFunc1();
                    _this.cleanUpFunc2();
                });
            }
            HeaderController.$inject = [
                "$rootScope",
                "$scope",
                "$log"
            ];
            return HeaderController;
        })();
        header.HeaderController = HeaderController;
        angular.module("app").controller(header.headerController_StringName, app.header.HeaderController);
    })(header = app.header || (app.header = {}));
})(app || (app = {}));
var appRootScopeEvent;
(function (appRootScopeEvent) {
    appRootScopeEvent.invalidForm = "invalid";
    appRootScopeEvent.validForm = "valid";
    appRootScopeEvent.delete_ = "delete";
    appRootScopeEvent.addNew = "add";
    appRootScopeEvent.save = "save";
})(appRootScopeEvent || (appRootScopeEvent = {}));
var app;
(function (app) {
    var run;
    (function (_run) {
        "use strict";
        angular.module("app").run(run);
        run.$inject = [
            "$rootScope",
            "$location",
            "$window",
            "$state",
        ];
        function run($rootScope, $location, $window, $state) {
            $rootScope.headerConfiguration = new app.header.HeaderConfiguration();
            $rootScope.goBack = function () {
                $window.history.back();
            };
            $rootScope.save = function () {
                $rootScope.$broadcast(appRootScopeEvent.save);
            };
            $rootScope.delete = function () {
                $rootScope.$broadcast(appRootScopeEvent.delete_);
            };
            $rootScope.addNew = function () {
                $rootScope.$broadcast(appRootScopeEvent.addNew);
            };
        }
    })(run = app.run || (app.run = {}));
})(app || (app = {}));
var app;
(function (app) {
    var main;
    (function (main) {
        "use strict";
        main.mainTemplate_StringName = "app/main/main.html";
        main.mainController_StringName = "app.main.MainController";
        var MainController = (function () {
            function MainController($rootScope, $scope, $log, $mdSidenav, picturesService, NotificationService) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.$scope = $scope;
                this.$log = $log;
                this.$mdSidenav = $mdSidenav;
                this.picturesService = picturesService;
                this.NotificationService = NotificationService;
                this.$log.debug(app.main.mainController_StringName + " loaded!");
                this.$rootScope.headerConfiguration = new app.header.HeaderConfiguration("", true);
                this.$scope.$on("$destroy", function () {
                    _this.$rootScope.headerConfiguration = new app.header.HeaderConfiguration();
                    ;
                });
                picturesService.getAll().then(function (picturesFromServer) {
                    _this.pictures = picturesFromServer.files;
                }).catch(function (reason) {
                    _this.$log.warn("Error message: \n" + JSON.stringify(reason), "Cannot load pictures resources:");
                    _this.NotificationService.error("Error message: \n" + JSON.stringify(reason), "Cannot load paints resources:");
                });
            }
            MainController.$inject = [
                "$rootScope",
                "$scope",
                "$log",
                "$mdSidenav",
                "picturesService",
                "NotificationService"
            ];
            return MainController;
        })();
        main.MainController = MainController;
        angular.module("app").controller(app.main.mainController_StringName, app.main.MainController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
var app;
(function (app) {
    var login;
    (function (login) {
        "use strict";
        login.loginTemplate_StringName = "app/login/login.html";
        login.loginController_StringName = "app.login.LoginController";
        ;
        var LoginController = (function () {
            function LoginController($rootScope, $scope, NotificationService, $state, $auth, $log, UserLoggedService) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.$scope = $scope;
                this.NotificationService = NotificationService;
                this.$state = $state;
                this.$auth = $auth;
                this.$log = $log;
                this.UserLoggedService = UserLoggedService;
                this.submit = function () {
                    _this.$auth.login({ email: _this.email, password: _this.password }).then(function (response) {
                        _this.UserLoggedService.login(response.data.user);
                        var msg = "Thanks '" + response.data.user.email + "' for coming back!";
                        _this.$log.debug(msg);
                        _this.NotificationService.success(msg);
                        if (!_this.UserLoggedService.active) {
                            msg = "Do not forget to active your account via the email sent!";
                            _this.NotificationService.warning(msg);
                        }
                        _this.$state.go("main");
                    }).catch(function (err) {
                        _this.$log.error("login:" + JSON.stringify(err));
                        _this.NotificationService.error("Error registering!" + JSON.stringify(err));
                        _this.UserLoggedService.logout();
                    });
                };
                this.authenticate = function (provider) {
                    _this.$auth.authenticate(provider).then(function (response) {
                        _this.UserLoggedService.login(response.data.user);
                        var msg = "Thanks '" + response.data.user.email + "' for coming back!";
                        _this.$log.debug(msg);
                        _this.NotificationService.success(msg);
                        _this.$state.go("main");
                    }).catch(function (err) {
                        _this.$log.error("login:" + JSON.stringify(err));
                        _this.NotificationService.error("Error registering!");
                        _this.UserLoggedService.logout();
                    });
                };
                this.$log.debug("LoginController: Constructor");
                this.$rootScope.headerConfiguration = new app.header.HeaderConfiguration("", true);
                this.$scope.$on("$destroy", function () {
                    _this.$rootScope.headerConfiguration = new app.header.HeaderConfiguration();
                    ;
                });
            }
            LoginController.$inject = [
                "$rootScope",
                "$scope",
                "NotificationService",
                "$state",
                "$auth",
                "$log",
                "UserLoggedService"
            ];
            return LoginController;
        })();
        login.LoginController = LoginController;
        angular.module("app").controller(app.login.loginController_StringName, app.login.LoginController);
    })(login = app.login || (app.login = {}));
})(app || (app = {}));
var app;
(function (app) {
    var logout;
    (function (logout) {
        "use strict";
        logout.logoutTemplate_StringName = "app/logout/logout.html";
        logout.logoutController_StringName = "app.logout.LogoutController";
        var LogoutController = (function () {
            function LogoutController($rootScope, $auth, $state, NotificationService, $log, UserLoggedService) {
                this.$rootScope = $rootScope;
                this.$auth = $auth;
                this.$state = $state;
                this.NotificationService = NotificationService;
                this.$log = $log;
                this.UserLoggedService = UserLoggedService;
                this.$auth.logout();
                this.UserLoggedService.logout();
                NotificationService.info("You are now logout!", "Authentication message");
                this.$log.debug(app.logout.logoutController_StringName + "loaded!");
                this.$state.go(appState.mainState);
            }
            LogoutController.$inject = [
                "$rootScope",
                "$auth",
                "$state",
                "NotificationService",
                "$log",
                "UserLoggedService"
            ];
            return LogoutController;
        })();
        logout.LogoutController = LogoutController;
        angular.module("app").controller(app.logout.logoutController_StringName, app.logout.LogoutController);
    })(logout = app.logout || (app.logout = {}));
})(app || (app = {}));
var app;
(function (app) {
    var register;
    (function (register) {
        "use strict";
        register.registerTemplate_StringName = "app/register/register.html";
        register.registerController_StringName = "app.register.RegisterController";
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
                this.$rootScope.headerConfiguration = new app.header.HeaderConfiguration("", false, true);
                this.$scope.$on("$destroy", function () {
                    _this.$rootScope.headerConfiguration = new app.header.HeaderConfiguration();
                    ;
                });
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
        angular.module("app").controller(app.register.registerController_StringName, app.register.RegisterController);
    })(register = app.register || (app.register = {}));
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
    var users;
    (function (users) {
        "use strict";
        users.userService_StringName = "UserService";
        var UserService = (function () {
            function UserService($http) {
                this.$http = $http;
            }
            UserService.prototype.getById = function (uniqueId) {
                return this.$http.get("/api/adm/users/" + uniqueId).then(function (response) {
                    return response.data[0];
                });
            };
            UserService.prototype.getAll = function () {
                return this.$http.get("/api/adm/users/").then(function (response) {
                    return response.data;
                });
            };
            UserService.prototype.update = function (user) {
                return this.$http.put("/api/adm/users/" + user._id, user).then(function (response) {
                    return response.data;
                });
            };
            UserService.prototype.delete = function (uniqueId) {
                return this.$http.delete("/api/adm/users/" + uniqueId).then(function (response) {
                    return response.data;
                });
            };
            UserService.$inject = ["$http"];
            return UserService;
        })();
        angular.module("app").service(app.users.userService_StringName, UserService);
    })(users = app.users || (app.users = {}));
})(app || (app = {}));
var app;
(function (app) {
    var users;
    (function (users) {
        "use strict";
        users.userTemplate_StringName = "app/users/user.html";
        users.userController_StringName = "app.users.UserController";
        var UserController = (function () {
            function UserController($scope, $rootScope, $http, CST_API_URL, NotificationService, $log, $stateParams, $mdBottomSheet, UserService, AuthorizationService, $mdDialog, $q) {
                var _this = this;
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.$http = $http;
                this.CST_API_URL = CST_API_URL;
                this.NotificationService = NotificationService;
                this.$log = $log;
                this.$stateParams = $stateParams;
                this.$mdBottomSheet = $mdBottomSheet;
                this.UserService = UserService;
                this.AuthorizationService = AuthorizationService;
                this.$mdDialog = $mdDialog;
                this.$q = $q;
                this.UIRoles = [];
                this.allowRole = function (role) {
                    if (role.allowed) {
                        _this.AuthorizationService.addRole(_this.user.allowedRoles, role.code);
                        _this.$log.info("role:" + role.code + " selected: allowed");
                    }
                    else {
                        _this.AuthorizationService.removeRole(_this.user.allowedRoles, role.code);
                        _this.$log.info("role:" + role.code + " selected: NOT allowed");
                    }
                };
                this.saveUSer = function () {
                    _this.UserService.update(_this.user).then(function (user) {
                        _this.$log.debug("user saved!:" + JSON.stringify(user));
                    }).catch(function (err) {
                        _this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot save uers resources:");
                        _this.NotificationService.error("Error message: \n" + JSON.stringify(err), "Cannot save users resources:");
                    });
                    _this.$rootScope.goBack();
                };
                this.deleteUser = function () {
                    var confirm = _this.$mdDialog.confirm().title('Confirm deletion').content('You are going to delete the user:' + _this.user.displayName).ariaLabel('Lucky day').ok('Cancel').cancel('Delete');
                    _this.$mdDialog.show(confirm).then(function () {
                    }, function () {
                        _this.UserService.delete(_this.$stateParams.userId).then(function (user) {
                            _this.$log.debug("user deleted!:" + JSON.stringify(user));
                        }).catch(function (err) {
                            _this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot save uers resources:");
                            _this.NotificationService.error("Error message: \n" + JSON.stringify(err), "Cannot save users resources:");
                        });
                        _this.$rootScope.goBack();
                    });
                };
                this.loadRoles = function () {
                    _this.AuthorizationService.getAllRoles().then(function (roles) {
                        _this.$log.debug("roles loaded!");
                        _this.user.allowedRoles = _this.user.allowedRoles === undefined ? [] : _this.user.allowedRoles;
                        for (var i = 0; i < roles.length; i++) {
                            _this.UIRoles.push({
                                allowed: _this.AuthorizationService.hasGotRole(_this.user.allowedRoles, roles[i].id),
                                code: roles[i].id,
                            });
                        }
                    }).catch(function (err) {
                        _this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot load roles resources:");
                        _this.NotificationService.error("Error message: \n" + JSON.stringify(err), "Cannot load roles resources:");
                    });
                };
                if (!this.$stateParams.userId) {
                    var msg = "UserId is missing to initialize the user detail view!";
                    alert(msg);
                    console.error(msg);
                }
                else {
                    this.$rootScope.headerConfiguration = new app.header.HeaderConfiguration("User detail", false, true, false, false, true, true);
                    this.$scope.$on("$destroy", function () {
                        _this.$rootScope.headerConfiguration = new app.header.HeaderConfiguration();
                        ;
                    });
                    this.UserService.getById(this.$stateParams.userId).then(function (user) {
                        _this.user = user;
                        _this.$log.debug("user loaded!:" + JSON.stringify(_this.user));
                    }).then(function () {
                        _this.loadRoles();
                    }).catch(function (err) {
                        var msg = "Error message: \n" + JSON.stringify(err) + "\nCannot load uers resources:";
                        _this.$log.error(msg);
                        _this.NotificationService.error(msg);
                    });
                    this.$scope.$on("save", this.saveUSer);
                    this.$scope.$on("delete", this.deleteUser);
                    this.$scope.$watch(function () { return _this.$scope.userForm.$invalid; }, function (newValue, oldValue) {
                        if (newValue) {
                            _this.$scope.$emit(appRootScopeEvent.invalidForm);
                        }
                        else {
                            _this.$scope.$emit(appRootScopeEvent.validForm);
                        }
                    });
                }
                this.$log.debug("UserController: Constructor");
            }
            UserController.$inject = [
                "$scope",
                "$rootScope",
                "$http",
                "CST_API_URL",
                "NotificationService",
                "$log",
                "$stateParams",
                "$mdBottomSheet",
                "UserService",
                "AuthorizationService",
                "$mdDialog",
                "$q"
            ];
            return UserController;
        })();
        users.UserController = UserController;
        angular.module("app").controller(app.users.userController_StringName, app.users.UserController);
    })(users = app.users || (app.users = {}));
})(app || (app = {}));
var app;
(function (app) {
    var users;
    (function (_users) {
        "use strict";
        _users.usersTemplate_StringName = "app/users/users.html";
        _users.usersController_StringName = "app.users.UsersController";
        var UsersController = (function () {
            function UsersController($scope, $rootScope, $http, CST_API_URL, NotificationService, $log, $mdDialog, $filter, $state, UserService) {
                var _this = this;
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.$http = $http;
                this.CST_API_URL = CST_API_URL;
                this.NotificationService = NotificationService;
                this.$log = $log;
                this.$mdDialog = $mdDialog;
                this.$filter = $filter;
                this.$state = $state;
                this.UserService = UserService;
                this.users = [];
                this.usersView = [];
                this.onClick = function (userID) {
                    var userParams = new app.adm.users.UserRouteParams(userID);
                    _this.$state.go("user", userParams);
                };
                this.$rootScope.headerConfiguration = new app.header.HeaderConfiguration("Users", true, false, false, false, false, false);
                this.$scope.$on("$destroy", function () {
                    _this.$rootScope.headerConfiguration = new app.header.HeaderConfiguration();
                    ;
                });
                this.UserService.getAll().then(function (users) {
                    _this.users = users;
                    _this.usersView = [].concat(_this.users);
                    _this.$log.debug("users loaded!");
                }).catch(function (err) {
                    _this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot load users resources:");
                    _this.NotificationService.error("Error message: \n" + JSON.stringify(err), "Cannot load users resources:");
                });
                this.$log.debug("UsersController: Constructor");
            }
            UsersController.$inject = [
                "$scope",
                "$rootScope",
                "$http",
                "CST_API_URL",
                "NotificationService",
                "$log",
                "$mdDialog",
                "$filter",
                "$state",
                "UserService"
            ];
            return UsersController;
        })();
        _users.UsersController = UsersController;
        angular.module("app").controller(app.users.usersController_StringName, app.users.UsersController);
    })(users = app.users || (app.users = {}));
})(app || (app = {}));
var appState;
(function (appState) {
    appState.users = "users";
    appState.usersUrl = "/users";
    appState.user = "user";
})(appState || (appState = {}));
var app;
(function (app) {
    var adm;
    (function (adm) {
        var users;
        (function (users) {
            "use strict";
            var UserRouteParams = (function () {
                function UserRouteParams(userId) {
                    this.userId = userId;
                }
                return UserRouteParams;
            })();
            users.UserRouteParams = UserRouteParams;
            route.$inject = [
                "$stateProvider"
            ];
            function route($stateProvider) {
                $stateProvider.state(appState.users, {
                    url: appState.usersUrl,
                    views: {
                        'header': {
                            templateUrl: app.header.headerTemplate_StringName,
                            controller: app.header.headerController_StringName,
                            controllerAs: "vm"
                        },
                        'container': {
                            templateUrl: app.users.usersTemplate_StringName,
                            controller: app.users.usersController_StringName,
                            controllerAs: "vm"
                        },
                        'footer': {}
                    }
                }).state(appState.user, {
                    url: appState.usersUrl + "/{userId}",
                    views: {
                        'header': {
                            templateUrl: app.header.headerTemplate_StringName,
                            controller: app.header.HeaderController,
                            controllerAs: "vm"
                        },
                        'container': {
                            templateUrl: app.users.userTemplate_StringName,
                            controller: app.users.userController_StringName,
                            controllerAs: "vm"
                        },
                        'footer': {}
                    }
                });
            }
            ;
            angular.module("app").config(route);
        })(users = adm.users || (adm.users = {}));
    })(adm = app.adm || (app.adm = {}));
})(app || (app = {}));
var app;
(function (app) {
    var paints;
    (function (_paints) {
        "use strict";
        _paints.paintsTemplate_StringName = "app/paints/paints.html";
        _paints.paintsController_StringName = "app.paints.PaintsController";
        var PaintsController = (function () {
            function PaintsController($rootScope, $scope, $http, CST_API_URL, NotificationService, $log) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.$scope = $scope;
                this.$http = $http;
                this.CST_API_URL = CST_API_URL;
                this.NotificationService = NotificationService;
                this.$log = $log;
                this.paints = [];
                $http.get(this.CST_API_URL + "/paints").error(function (err) {
                    _this.$log.warn("Error message: \n" + JSON.stringify(err), "Cannot load paints resources:");
                    _this.NotificationService.error("Error message: \n" + JSON.stringify(err), "Cannot load paints resources:");
                }).success(function (paints) {
                    _this.paints = paints;
                    _this.$log.debug("paints loaded!");
                });
                this.$rootScope.headerConfiguration = new app.header.HeaderConfiguration("", true);
                this.$scope.$on("$destroy", function () {
                    _this.$rootScope.headerConfiguration = new app.header.HeaderConfiguration();
                    ;
                });
                this.$log.debug(_paints.paintsController_StringName + " loaded!");
            }
            PaintsController.$inject = [
                "$rootScope",
                "$scope",
                "$http",
                "CST_API_URL",
                "NotificationService",
                "$log"
            ];
            return PaintsController;
        })();
        _paints.PaintsController = PaintsController;
        angular.module("app").controller(app.paints.paintsController_StringName, app.paints.PaintsController);
    })(paints = app.paints || (app.paints = {}));
})(app || (app = {}));
var app;
(function (app) {
    var pictures;
    (function (pictures) {
        "use strict";
        pictures.picturesService_StringName = "picturesService";
        var PicturesService = (function () {
            function PicturesService($http) {
                this.$http = $http;
            }
            PicturesService.prototype.getAll = function () {
                return this.$http.get("/api/pictures").then(function (response) {
                    return response.data;
                });
            };
            PicturesService.prototype.delete = function (fileNameToDelete) {
                return this.$http.delete("/api/pictures/" + fileNameToDelete).then(function (response) {
                    return response.data;
                });
            };
            PicturesService.$inject = ["$http"];
            return PicturesService;
        })();
        angular.module("app").service(app.pictures.picturesService_StringName, PicturesService);
    })(pictures = app.pictures || (app.pictures = {}));
})(app || (app = {}));
var app;
(function (app) {
    var pictures;
    (function (pictures) {
        "use strict";
        pictures.pictureTemplate_StringName = "app/pictures/picture.html";
        pictures.pictureController_StringName = "app.pictures.PictureController";
        var PictureController = (function () {
            function PictureController($scope, $rootScope, NotificationService, $log, $stateParams, picturesService, $mdDialog) {
                var _this = this;
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.NotificationService = NotificationService;
                this.$log = $log;
                this.$stateParams = $stateParams;
                this.picturesService = picturesService;
                this.$mdDialog = $mdDialog;
                this.$rootScope.headerConfiguration = new app.header.HeaderConfiguration("Picture detail", false, true, false, false, true, true);
                this.$scope.$on("$destroy", function () {
                    _this.$rootScope.headerConfiguration = new app.header.HeaderConfiguration();
                    ;
                });
                if (!this.$stateParams.fileName) {
                    alert("fileName is missing to initialize the picture detail view!");
                    console.error("fileName is missing to initialize the user detail view!");
                }
                else {
                    this.pictureFileName = this.$stateParams.fileName;
                    this.$scope.$on("delete", function () {
                        var confirm = $mdDialog.confirm().title('Confirm deletion').content('Are going to delete the fileName:' + _this.pictureFileName).ariaLabel('Lucky day').ok('Cancel').cancel('Delete');
                        $mdDialog.show(confirm).then(function () {
                        }, function () {
                            _this.picturesService.delete(_this.$stateParams.fileName).then(function (picture) {
                                _this.$log.debug("user deleted!:" + JSON.stringify(picture));
                            }).catch(function (err) {
                                _this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot delete picture resource!");
                                _this.NotificationService.error("Error message: \n" + JSON.stringify(err), "Cannot delete resource!");
                            });
                            _this.$rootScope.goBack();
                        });
                    });
                }
                this.$log.debug(pictures.pictureController_StringName + ": Constructor");
            }
            PictureController.$inject = [
                "$scope",
                "$rootScope",
                "NotificationService",
                "$log",
                "$stateParams",
                "picturesService",
                "$mdDialog"
            ];
            return PictureController;
        })();
        pictures.PictureController = PictureController;
        angular.module("app").controller(pictures.pictureController_StringName, app.pictures.PictureController);
    })(pictures = app.pictures || (app.pictures = {}));
})(app || (app = {}));
var app;
(function (app) {
    var pictures;
    (function (pictures) {
        "use strict";
        pictures.picturesTemplate_StringName = "app/pictures/pictures.html";
        pictures.picturesController_StringName = "app.pictures.PicturesController";
        var PicturesController = (function () {
            function PicturesController($rootScope, $scope, $http, CST_API_URL, NotificationService, $log, $auth, $state, picturesService) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.$scope = $scope;
                this.$http = $http;
                this.CST_API_URL = CST_API_URL;
                this.NotificationService = NotificationService;
                this.$log = $log;
                this.$auth = $auth;
                this.$state = $state;
                this.picturesService = picturesService;
                this.onClick = function (fileName) {
                    var picturesParams = new app.pictures.PictureRouteParams(fileName);
                    _this.$state.go(appState.picture, picturesParams);
                };
                console.log(pictures.picturesController_StringName + " loaded!");
                this.$rootScope.headerConfiguration = new app.header.HeaderConfiguration("Pictures", true, false, false, true);
                this.$scope.$on("$destroy", function () {
                    _this.$rootScope.headerConfiguration = new app.header.HeaderConfiguration();
                    ;
                });
                this.$scope.$on(appRootScopeEvent.addNew, function () {
                    _this.$state.go(appState.picturesLoad);
                });
                picturesService.getAll().then(function (picturesFromServer) {
                    _this.pictures = picturesFromServer.files;
                }).catch(function (reason) {
                    _this.$log.warn("Error message: \n" + JSON.stringify(reason), "Cannot load pictures resources:");
                    _this.NotificationService.error("Error message: \n" + JSON.stringify(reason), "Cannot load paints resources:");
                });
            }
            PicturesController.$inject = [
                "$rootScope",
                "$scope",
                "$http",
                "CST_API_URL",
                "NotificationService",
                "$log",
                "$auth",
                "$state",
                app.pictures.picturesService_StringName
            ];
            return PicturesController;
        })();
        pictures.PicturesController = PicturesController;
        angular.module("app").controller(app.pictures.picturesController_StringName, app.pictures.PicturesController);
    })(pictures = app.pictures || (app.pictures = {}));
})(app || (app = {}));
var app;
(function (app) {
    var pictures;
    (function (pictures) {
        "use strict";
        pictures.pictureUploadTemplate_StringName = "app/pictures/picturesUpload.html";
        pictures.pictureUploadController_StringName = "app.pictures.PicturesUploadController";
        var PicturesUploadController = (function () {
            function PicturesUploadController($scope, $rootScope, $http, CST_API_URL, NotificationService, $log, FileUploader, $auth, $state) {
                var _this = this;
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.$http = $http;
                this.CST_API_URL = CST_API_URL;
                this.NotificationService = NotificationService;
                this.$log = $log;
                this.FileUploader = FileUploader;
                this.$auth = $auth;
                this.$state = $state;
                console.log(app.pictures.pictureUploadController_StringName + " loaded!");
                this.$rootScope.headerConfiguration = new app.header.HeaderConfiguration("Upload pictures", false, true);
                this.$scope.$on("$destroy", function () {
                    _this.$rootScope.headerConfiguration = new app.header.HeaderConfiguration();
                    ;
                });
                var FileUploadConfig;
                FileUploadConfig = {
                    url: "/api/pictures/upload",
                    autoUpload: true,
                    removeAfterUpload: true,
                    headers: {
                        "authorization": "Bearer " + this.$auth.getToken()
                    }
                };
                this.uploader = new this.FileUploader(FileUploadConfig);
                this.uploader.onWhenAddingFileFailed = function (item, filter, options) {
                    console.info('onWhenAddingFileFailed', item, filter, options);
                };
                this.uploader.onAfterAddingFile = function (fileItem) {
                    console.info('onAfterAddingFile', fileItem);
                };
                this.uploader.onAfterAddingAll = function (addedFileItems) {
                    console.info('onAfterAddingAll', addedFileItems);
                };
                this.uploader.onBeforeUploadItem = function (item) {
                    console.info('onBeforeUploadItem', item);
                };
                this.uploader.onProgressItem = function (fileItem, progress) {
                    console.info('onProgressItem', fileItem, progress);
                };
                this.uploader.onProgressAll = function (progress) {
                    console.info('onProgressAll', progress);
                };
                this.uploader.onSuccessItem = function (fileItem, response, status, headers) {
                    console.info('onSuccessItem', fileItem, response, status, headers);
                };
                this.uploader.onErrorItem = function (fileItem, response, status, headers) {
                    console.info('onErrorItem', fileItem, response, status, headers);
                };
                this.uploader.onCancelItem = function (fileItem, response, status, headers) {
                    console.info('onCancelItem', fileItem, response, status, headers);
                };
                this.uploader.onCompleteItem = function (fileItem, response, status, headers) {
                    console.info('onCompleteItem', fileItem, response, status, headers);
                };
                this.uploader.onCompleteAll = function () {
                    console.info('onCompleteAll');
                    _this.$rootScope.goBack();
                };
                console.info('uploader', this.uploader);
            }
            PicturesUploadController.$inject = [
                "$scope",
                "$rootScope",
                "$http",
                "CST_API_URL",
                "NotificationService",
                "$log",
                "FileUploader",
                "$auth",
                "$state"
            ];
            return PicturesUploadController;
        })();
        pictures.PicturesUploadController = PicturesUploadController;
        angular.module("app").controller(app.pictures.pictureUploadController_StringName, app.pictures.PicturesUploadController);
    })(pictures = app.pictures || (app.pictures = {}));
})(app || (app = {}));
var appState;
(function (appState) {
    "use strict";
    appState.picturesLoad = "PICTUREUPLOAD";
    appState.picturesLoadUrl = "/picturesupload";
    appState.picturesList = "PICTURES";
    appState.picturesListUrl = "/pictures";
    appState.picture = "PICTURE";
})(appState || (appState = {}));
var app;
(function (app) {
    var pictures;
    (function (pictures) {
        "use strict";
        var PictureRouteParams = (function () {
            function PictureRouteParams(fileName) {
                this.fileName = fileName;
            }
            return PictureRouteParams;
        })();
        pictures.PictureRouteParams = PictureRouteParams;
        route.$inject = [
            "$stateProvider"
        ];
        function route($stateProvider) {
            $stateProvider.state(appState.picturesList, {
                url: appState.picturesListUrl,
                views: {
                    'header': {
                        templateUrl: app.header.headerTemplate_StringName,
                        controller: app.header.headerController_StringName,
                        controllerAs: "vm"
                    },
                    'container': {
                        templateUrl: app.pictures.picturesTemplate_StringName,
                        controller: app.pictures.picturesController_StringName,
                        controllerAs: "vm"
                    },
                    'footer': {}
                }
            }).state(appState.picture, {
                url: appState.picturesListUrl + "/{fileName}",
                views: {
                    'header': {
                        templateUrl: app.header.headerTemplate_StringName,
                        controller: app.header.headerController_StringName,
                        controllerAs: "vm"
                    },
                    'container': {
                        templateUrl: app.pictures.pictureTemplate_StringName,
                        controller: app.pictures.pictureController_StringName,
                        controllerAs: "vm"
                    },
                    'footer': {}
                }
            }).state(appState.picturesLoad, {
                url: appState.picturesLoadUrl,
                views: {
                    'header': {
                        templateUrl: app.header.headerTemplate_StringName,
                        controller: app.header.headerController_StringName,
                        controllerAs: "vm"
                    },
                    'container': {
                        templateUrl: app.pictures.pictureUploadTemplate_StringName,
                        controller: app.pictures.pictureUploadController_StringName,
                        controllerAs: "vm"
                    },
                    'footer': {}
                }
            });
        }
        ;
        angular.module("app").config(route);
    })(pictures = app.pictures || (app.pictures = {}));
})(app || (app = {}));
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
    var authorization;
    (function (authorization) {
        "use strict";
        authorization.authorizatinService_StringName = "AuthorizationService";
        var AuthorizationService = (function () {
            function AuthorizationService($http) {
                this.$http = $http;
            }
            AuthorizationService.prototype.getAllAccessRights = function () {
                return this.$http.get("/api/authorization/accessrights").then(function (response) {
                    return response.data;
                });
            };
            AuthorizationService.prototype.getAllRoles = function () {
                return this.$http.get("/api/authorization/roles").then(function (response) {
                    return response.data;
                });
            };
            AuthorizationService.prototype.addRole = function (roles, roleID) {
                if (roles[roleID] === undefined) {
                    roles.push(roleID);
                }
            };
            AuthorizationService.prototype.removeRole = function (roles, roleID) {
                var index = roles.indexOf(roleID);
                roles.splice(index, 1);
            };
            AuthorizationService.prototype.hasGotRole = function (roles, roleID) {
                return roles.indexOf(roleID) === -1 ? false : true;
            };
            AuthorizationService.$inject = ["$http"];
            return AuthorizationService;
        })();
        angular.module("app").service(app.authorization.authorizatinService_StringName, AuthorizationService);
    })(authorization = app.authorization || (app.authorization = {}));
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
                        });
                    };
                    this.onSwipeRight = function () {
                        _this.$mdSidenav("left").open();
                    };
                    this.onSwipeLeft = function () {
                        _this.$mdSidenav("left").close();
                    };
                    this.isAuthenticated = this.$auth.isAuthenticated;
                    if (!this.$auth.isAuthenticated()) {
                        this.$auth.removeToken();
                    }
                    ;
                    this.$log.debug("IndexController: Constructor");
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
var appState;
(function (appState) {
    "use strict";
    appState.loginState = "login";
    appState.loginUrl = "/login";
})(appState || (appState = {}));
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
                $stateProvider.state(appState.loginState, {
                    url: appState.loginUrl,
                    views: {
                        'header': {
                            templateUrl: app.header.headerTemplate_StringName,
                            controller: app.header.headerController_StringName,
                            controllerAs: "vm"
                        },
                        'container': {
                            templateUrl: app.login.loginTemplate_StringName,
                            controller: app.login.loginController_StringName,
                            controllerAs: "vm"
                        },
                        'footer': {}
                    }
                });
            }
            ;
            angular.module("app").config(route);
        })(login = views.login || (views.login = {}));
    })(views = app.views || (app.views = {}));
})(app || (app = {}));
var appState;
(function (appState) {
    "use strict";
    appState.logoutState = "logout";
    appState.logoutUrl = "/logout";
})(appState || (appState = {}));
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
                $stateProvider.state(appState.logoutState, {
                    url: appState.logoutUrl,
                    views: {
                        'header': {},
                        'container': {
                            templateUrl: app.logout.logoutTemplate_StringName,
                            controller: app.logout.logoutController_StringName,
                            controllerAs: "vm"
                        },
                        'footer': {}
                    }
                });
            }
            ;
            angular.module("app").config(route);
        })(logout = views.logout || (views.logout = {}));
    })(views = app.views || (app.views = {}));
})(app || (app = {}));
var appState;
(function (appState) {
    "use strict";
    appState.mainState = "main";
    appState.mainUrl = "/";
})(appState || (appState = {}));
var app;
(function (app) {
    var main;
    (function (main) {
        "use strict";
        route.$inject = [
            "$stateProvider"
        ];
        function route($stateProvider) {
            $stateProvider.state(appState.mainState, {
                url: appState.mainUrl,
                views: {
                    'header': {
                        templateUrl: app.header.headerTemplate_StringName,
                        controller: app.header.headerController_StringName,
                        controllerAs: "vm",
                    },
                    'container': {
                        templateUrl: app.main.mainTemplate_StringName,
                        controller: app.main.mainController_StringName,
                        controllerAs: "vm"
                    },
                    'footer': {}
                }
            });
        }
        ;
        angular.module("app").config(route);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
var appState;
(function (appState) {
    "use strict";
    appState.paintsState = "paints";
    appState.paintsUrl = "/paints";
})(appState || (appState = {}));
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
                $stateProvider.state(appState.paintsState, {
                    url: appState.paintsUrl,
                    views: {
                        'header': {
                            templateUrl: app.header.headerTemplate_StringName,
                            controller: app.header.headerController_StringName,
                            controllerAs: "vm"
                        },
                        'container': {
                            templateUrl: app.paints.paintsTemplate_StringName,
                            controller: app.paints.paintsController_StringName,
                            controllerAs: "vm"
                        },
                        'footer': {}
                    }
                });
            }
            ;
            angular.module("app").config(route);
        })(paints = views.paints || (views.paints = {}));
    })(views = app.views || (app.views = {}));
})(app || (app = {}));
var appState;
(function (appState) {
    "use strict";
    appState.registerState = "register";
    appState.registerUrl = "/register";
})(appState || (appState = {}));
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
                $stateProvider.state(appState.registerState, {
                    url: appState.registerUrl,
                    views: {
                        'header': {
                            templateUrl: app.header.headerTemplate_StringName,
                            controller: app.header.headerController_StringName,
                            controllerAs: "vm"
                        },
                        'container': {
                            templateUrl: app.register.registerTemplate_StringName,
                            controller: app.register.registerController_StringName,
                            controllerAs: "vm"
                        },
                        'footer': {}
                    }
                });
            }
            ;
            angular.module("app").config(route);
        })(register = views.register || (views.register = {}));
    })(views = app.views || (app.views = {}));
})(app || (app = {}));
var app;
(function (app) {
    var users;
    (function (users) {
        "use strict";
        var UserLoggedService = (function () {
            function UserLoggedService($http, $auth) {
                var _this = this;
                this.$http = $http;
                this.$auth = $auth;
                this.login = function (userBackend) {
                    _this.email = userBackend.email;
                    _this.displayName = userBackend.displayName || "";
                    _this.isAuthenticated = true;
                    _this.active = userBackend.active;
                    _this.picture = userBackend.picture || "";
                };
                this.logout = function () {
                    _this.email = "";
                    _this.displayName = "";
                    _this.isAuthenticated = false;
                    _this.active = false;
                    _this.picture = "";
                };
                this.isAuthenticated = false;
                this.$auth.logout();
                this.$auth.removeToken();
                this.logout();
            }
            UserLoggedService.$inject = [
                "$http",
                "$auth"
            ];
            return UserLoggedService;
        })();
        angular.module("app").service("UserLoggedService", UserLoggedService);
    })(users = app.users || (app.users = {}));
})(app || (app = {}));
var app;
(function (app) {
    var sidenav;
    (function (sidenav) {
        "use strict";
        sidenav.sidenavTemplate_StringName = "app/sidenav/sidenav.html";
        sidenav.sidenavController_StringName = "app.sidenav.SidenavController";
        var SidenavController = (function () {
            function SidenavController($scope, $auth, $mdSidenav, $log, UserLoggedService) {
                this.$scope = $scope;
                this.$auth = $auth;
                this.$mdSidenav = $mdSidenav;
                this.$log = $log;
                this.UserLoggedService = UserLoggedService;
                this.$log.debug("SidenavController: Constructor");
            }
            SidenavController.prototype.close = function () {
                this.$mdSidenav("left").close().then(function () {
                });
            };
            SidenavController.$inject = [
                "$scope",
                "$auth",
                "$mdSidenav",
                "$log",
                "UserLoggedService"
            ];
            return SidenavController;
        })();
        sidenav.SidenavController = SidenavController;
        angular.module("app").controller(app.sidenav.sidenavController_StringName, app.sidenav.SidenavController);
    })(sidenav = app.sidenav || (app.sidenav = {}));
})(app || (app = {}));
//# sourceMappingURL=app.js.map