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
        angular.module("app").service("UserService", UserService);
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
            $rootScope.$on("$routeChangeError", function () {
                alert("routeChangeError raised!");
            });
            $rootScope.previousState = { name: "", params: {} };
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                $rootScope.previousState.name = fromState.name;
                $rootScope.previousState.params = fromParams;
            });
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
            $rootScope.headerTitle = "";
        }
    })(run = app.run || (app.run = {}));
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
                        _this.$log.warn("Error message: \n" + JSON.stringify(err), "Cannot load paints resources:");
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
                    this.$rootScope.headerTitle = "";
                    this.$scope.$on("$destroy", function () {
                        _this.$rootScope.headerTitle = "";
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
                function LogoutController($rootScope, $auth, $state, NotificationService, $log, UserLoggedService) {
                    this.$rootScope = $rootScope;
                    this.$auth = $auth;
                    this.$state = $state;
                    this.NotificationService = NotificationService;
                    this.$log = $log;
                    this.UserLoggedService = UserLoggedService;
                    this.$log.debug("LogoutController: Constructor");
                    this.$auth.logout();
                    this.UserLoggedService.logout();
                    NotificationService.info("You are now logout!", "Authentication message");
                    this.$log.debug("LogoutController: Constructor");
                    this.$state.go(appState.MAIN);
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
        pictures.pictureTemplate_StringName = "app/views/pictures/picture.html";
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
        pictures.picturesTemplate_StringName = "app/views/pictures/pictures.html";
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
                this.$rootScope.headerTitle = "";
                this.$scope.$on("$destroy", function () {
                    _this.$rootScope.headerTitle = "";
                });
                this.$scope.$on(appRootScopeEvent.addNew, function () {
                    _this.$state.go(appState.picturesLoad);
                });
                picturesService.getAll().then(function (picturesFromServer) {
                    _this.pictures = picturesFromServer.files;
                }).catch(function (reason) {
                    console.log("Error getting all pictures:" + reason);
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
        pictures.pictureUploadTemplate_StringName = "app/views/pictures/picturesUpload.html";
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
                        templateUrl: app.header.headerAddTemplate_StringName,
                        controller: app.header.headerAddController_StringName,
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
                        templateUrl: app.header.headerBackDeleteSaveTemplate_StringName,
                        controller: app.header.headerBackDeleteSaveController_StringName,
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
                        templateUrl: app.header.headerMainTemplate_StringName,
                        controller: app.header.headerMainController_StringName,
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
var app;
(function (app) {
    var header;
    (function (header) {
        "use strict";
        header.headerAddTemplate_StringName = "app/views/headerAdd/headerAdd.html";
        header.headerAddController_StringName = "app.header.AddController";
        var HeaderAddController = (function () {
            function HeaderAddController($scope, $rootScope, $log) {
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.$log = $log;
                this.$log.debug(header.headerAddController_StringName + " loaded!");
            }
            HeaderAddController.$inject = [
                "$scope",
                "$rootScope",
                "$log"
            ];
            return HeaderAddController;
        })();
        header.HeaderAddController = HeaderAddController;
        angular.module("app").controller(header.headerAddController_StringName, app.header.HeaderAddController);
    })(header = app.header || (app.header = {}));
})(app || (app = {}));
var app;
(function (app) {
    var services;
    (function (services) {
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
    })(services = app.services || (app.services = {}));
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
    var users;
    (function (users) {
        "use strict";
        users.userTemplate_StringName = "app/views/adm/users/user.html";
        users.userController_StringName = "app.users.UserController";
        var UserController = (function () {
            function UserController($scope, $rootScope, $http, CST_API_URL, NotificationService, $log, $stateParams, $mdBottomSheet, UserService, $mdDialog) {
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
                this.$mdDialog = $mdDialog;
                if (!this.$stateParams.userId) {
                    alert("UserId is missing to initialize the user detail view!");
                    console.error("UserId is missing to initialize the user detail view!");
                }
                else {
                    this.UserService.getById(this.$stateParams.userId).then(function (user) {
                        _this.user = user;
                        _this.$log.debug("user loaded!:" + JSON.stringify(users));
                    }).catch(function (err) {
                        _this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot load uers resources:");
                        _this.NotificationService.error("Error message: \n" + JSON.stringify(err), "Cannot load users resources:");
                    });
                    this.$scope.$on("save", function () {
                        _this.UserService.update(_this.user).then(function (user) {
                            _this.$log.debug("user saved!:" + JSON.stringify(user));
                        }).catch(function (err) {
                            _this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot save uers resources:");
                            _this.NotificationService.error("Error message: \n" + JSON.stringify(err), "Cannot save users resources:");
                        });
                        _this.$rootScope.goBack();
                    });
                    this.$scope.$on("delete", function () {
                        var confirm = $mdDialog.confirm().title('Confirm deletion').content('Are going to delete the user:' + _this.user.displayName).ariaLabel('Lucky day').ok('Cancel').cancel('Delete');
                        $mdDialog.show(confirm).then(function () {
                        }, function () {
                            _this.UserService.delete(_this.$stateParams.userId).then(function (user) {
                                _this.$log.debug("user deleted!:" + JSON.stringify(user));
                            }).catch(function (err) {
                                _this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot save uers resources:");
                                _this.NotificationService.error("Error message: \n" + JSON.stringify(err), "Cannot save users resources:");
                            });
                            _this.$rootScope.goBack();
                        });
                    });
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
                "$mdDialog"
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
        _users.usersTemplate_StringName = "app/views/adm/users/users.html";
        _users.usersController_StringName = "app.users.UsersController";
        var UsersController = (function () {
            function UsersController($scope, $http, CST_API_URL, NotificationService, $log, $mdDialog, $filter, $state, UserService) {
                var _this = this;
                this.$scope = $scope;
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
                this.UserService.getAll().then(function (users) {
                    _this.users = users;
                    _this.usersView = [].concat(_this.users);
                    _this.$log.debug("users loaded!");
                }).catch(function (err) {
                    _this.$log.error("Error message: \n" + JSON.stringify(err), "Cannot load uers resources:");
                    _this.NotificationService.error("Error message: \n" + JSON.stringify(err), "Cannot load users resources:");
                });
                this.$log.debug("UsersController: Constructor");
            }
            UsersController.$inject = [
                "$scope",
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
    appState.usersUrl = "/adm/users";
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
                            templateUrl: app.header.headerMainTemplate_StringName,
                            controller: app.header.headerMainController_StringName,
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
                            templateUrl: app.header.headerBackDeleteSaveTemplate_StringName,
                            controller: app.header.HeaderBackDeleteSaveController,
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
    var views;
    (function (views) {
        var setup;
        (function (setup) {
            "use strict";
            var setupController = (function () {
                function setupController($log, $mdSidenav, $scope, $animate, $compile) {
                    this.$log = $log;
                    this.$mdSidenav = $mdSidenav;
                    this.$scope = $scope;
                    this.$animate = $animate;
                    this.$compile = $compile;
                    this.$log.debug("dndController: Constructor");
                }
                setupController.$inject = [
                    "$log",
                    "$mdSidenav",
                    "$scope",
                    "$animate",
                    "$compile"
                ];
                return setupController;
            })();
            setup.setupController = setupController;
            angular.module("app").controller("app.views.setup.setupController", app.views.setup.setupController);
        })(setup = views.setup || (views.setup = {}));
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
                $stateProvider.state("setup", {
                    url: "/setup",
                    views: {
                        'header': {
                            templateUrl: "app/views/headerMain/headerMain.html",
                            controller: app.header.headerMainController_StringName,
                            controllerAs: "vm"
                        },
                        'container': {
                            templateUrl: "app/views/setup/setup.html",
                            controller: "app.views.setup.setupController",
                            controllerAs: "vm"
                        },
                        'footer': {}
                    }
                });
            }
            ;
            angular.module("app").config(route);
        })(main = views.main || (views.main = {}));
    })(views = app.views || (app.views = {}));
})(app || (app = {}));
var app;
(function (app) {
    var header;
    (function (header) {
        "use strict";
        header.headerBackDeleteSaveTemplate_StringName = "app/views/headerBackDeleteSave/headerBackDeleteSave.html";
        header.headerBackDeleteSaveController_StringName = "app.header.BackDeleteSaveController";
        var HeaderBackDeleteSaveController = (function () {
            function HeaderBackDeleteSaveController($scope, $rootScope, $log, $state) {
                var _this = this;
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.$log = $log;
                this.$state = $state;
                this.$log.debug(header.headerBackDeleteSaveController_StringName + ": Constructor");
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
            HeaderBackDeleteSaveController.$inject = [
                "$scope",
                "$rootScope",
                "$log",
                "$location"
            ];
            return HeaderBackDeleteSaveController;
        })();
        header.HeaderBackDeleteSaveController = HeaderBackDeleteSaveController;
        angular.module("app").controller(header.headerBackDeleteSaveController_StringName, app.header.HeaderBackDeleteSaveController);
    })(header = app.header || (app.header = {}));
})(app || (app = {}));
var app;
(function (app) {
    var views;
    (function (views) {
        var header;
        (function (header) {
            "use strict";
            var HeaderBackSaveController = (function () {
                function HeaderBackSaveController($scope, $rootScope, $log, $state) {
                    var _this = this;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this.$log = $log;
                    this.$state = $state;
                    this.$log.debug("HeaderBackSaveController: Constructor");
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
                HeaderBackSaveController.$inject = [
                    "$scope",
                    "$rootScope",
                    "$log",
                    "$location"
                ];
                return HeaderBackSaveController;
            })();
            header.HeaderBackSaveController = HeaderBackSaveController;
            angular.module("app").controller("app.views.header.HeaderBackSaveController", app.views.header.HeaderBackSaveController);
        })(header = views.header || (views.header = {}));
    })(views = app.views || (app.views = {}));
})(app || (app = {}));
var app;
(function (app) {
    var views;
    (function (views) {
        var dnd;
        (function (dnd) {
            "use strict";
            var DndController = (function () {
                function DndController($log, $mdSidenav, $scope, $animate, $compile) {
                    var _this = this;
                    this.$log = $log;
                    this.$mdSidenav = $mdSidenav;
                    this.$scope = $scope;
                    this.$animate = $animate;
                    this.$compile = $compile;
                    this.onDragStart = function (evt) {
                        var target = evt.target;
                        evt.dataTransfer.setData("text", target.id);
                        _this.ElSource = _this.find(target.id);
                        console.log("Drag started: sourceId:" + target.id);
                    };
                    this.onDragEnd = function (evt) {
                        _this.ElSource = null;
                    };
                    this.onDrop = function (evt) {
                        evt.preventDefault();
                        var sourceId = evt.dataTransfer.getData("text");
                        var target = evt.target;
                        var targetId = target.id;
                        console.log("Drop: sourceId = " + sourceId);
                        console.log("Drop: targetId =" + targetId);
                        var targetEl = _this.find(targetId);
                        _this.$animate.move(_this.ElSource, targetEl, null);
                    };
                    this.find = function (id) {
                        return angular.element(document.querySelector("#" + id));
                    };
                    this.allowDrop = function (evt) {
                        evt.preventDefault();
                        console.log("allowDrop");
                    };
                    this.$log.debug("dndController: Constructor");
                }
                DndController.$inject = [
                    "$log",
                    "$mdSidenav",
                    "$scope",
                    "$animate",
                    "$compile"
                ];
                return DndController;
            })();
            dnd.DndController = DndController;
            angular.module("app").controller("app.views.dnd.DndController", app.views.dnd.DndController);
        })(dnd = views.dnd || (views.dnd = {}));
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
                $stateProvider.state("dnd", {
                    url: "/dnd",
                    views: {
                        'header': {
                            templateUrl: "app/views/headerMain/headerMain.html",
                            controller: app.header.headerMainController_StringName,
                            controllerAs: "vm"
                        },
                        'container': {
                            templateUrl: "app/views/dnd/dnd.html",
                            controller: "app.views.dnd.DndController",
                            controllerAs: "vmdnd"
                        },
                        'footer': {}
                    }
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
                    views: {
                        'header': {
                            templateUrl: "app/views/headerMain/headerMain.html",
                            controller: app.header.headerMainController_StringName,
                            controllerAs: "vm"
                        },
                        'container': {
                            templateUrl: "app/views/paints/paints.html",
                            controller: "app.views.paints.PaintsController",
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
                    views: {
                        'header': {
                            templateUrl: "app/views/headerMain/headerMain.html",
                            controller: app.header.headerMainController_StringName,
                            controllerAs: "vm"
                        },
                        'container': {
                            templateUrl: "app/views/login/login.html",
                            controller: "app.views.login.LoginController",
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
    appState.LOGOUT = "LOGOUT";
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
                $stateProvider.state(appState.LOGOUT, {
                    url: "/logout",
                    views: {
                        'header': {},
                        'container': {
                            templateUrl: "app/views/logout/logout.html",
                            controller: "app.views.logout.LogoutController",
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
var app;
(function (app) {
    var main;
    (function (main) {
        "use strict";
        main.mainController_NAME = "app.main.MainController";
        var MainController = (function () {
            function MainController($log, $mdSidenav, $rootScope) {
                this.$log = $log;
                this.$mdSidenav = $mdSidenav;
                this.$rootScope = $rootScope;
                this.$log.debug(app.main.mainController_NAME + " loaded!");
                this.$rootScope.headerTitle = "";
            }
            MainController.$inject = [
                "$log",
                "$mdSidenav",
                "$rootScope",
            ];
            return MainController;
        })();
        main.MainController = MainController;
        angular.module("app").controller(app.main.mainController_NAME, app.main.MainController);
    })(main = app.main || (app.main = {}));
})(app || (app = {}));
var appState;
(function (appState) {
    appState.MAIN = "main";
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
            $stateProvider.state(appState.MAIN, {
                url: "/",
                views: {
                    'header': {
                        templateUrl: "app/views/headerMain/headerMain.html",
                        controller: app.header.headerMainController_StringName,
                        controllerAs: "vm",
                    },
                    'container': {
                        templateUrl: "app/views/main/main.html",
                        controller: app.main.mainController_NAME,
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
                    views: {
                        'header': {},
                        'container': {
                            templateUrl: "app/views/register/register.html",
                            controller: "app.views.register.RegisterController",
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
    var views;
    (function (views) {
        var sidenav;
        (function (sidenav) {
            "use strict";
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
var app;
(function (app) {
    var header;
    (function (header) {
        "use strict";
        header.headerMainTemplate_StringName = "app/views/headerMain/headerMain.html";
        header.headerMainController_StringName = "app.header.MainController";
        var HeaderMainController = (function () {
            function HeaderMainController($scope, $log) {
                this.$scope = $scope;
                this.$log = $log;
                this.$log.debug("HeaderMainController: Constructor");
            }
            HeaderMainController.$inject = [
                "$scope",
                "$log"
            ];
            return HeaderMainController;
        })();
        header.HeaderMainController = HeaderMainController;
        angular.module("app").controller(header.headerMainController_StringName, app.header.HeaderMainController);
    })(header = app.header || (app.header = {}));
})(app || (app = {}));
//# sourceMappingURL=app.js.map