declare module satellizer {
    //TODO finalize the declaration and propose it to definitely typed .org

    //https://github.com/sahat/satellizer#api-reference
    //There is a good detail for the API reference
    export interface IAuthService {
        /**
         * $auth.login(user)
         * 
         * Sign in via email and password where:
         * 
         *      user - Plain JavaScript object.
         * 
         * Returns
         * 
         *      response - The $http response object from the server.
         * 
         * $auth.login({
         *      email: $scope.email,
         *      password: $scope.password
         * });
        */
        login<T>(user: any): ng.IHttpPromise<T>;

        /**
         * $auth.signup(user)
         * 
         * Creates a local account with email and password. You can use whatever fields you want as long as you implement them on the server.
         * user - Plain JavaScript object.
         * 
         * Returns
         *      response - The $http response object from the server.
         * 
         * Usage
         *      $auth.signup({
         *          email: $scope.email,
         *          password: $scope.password
         *      }).then(function(response) {
         *          console.log(response.data);});
         */
        signup<T>(user: any): ng.IHttpPromise<T>;
        authenticate<T>(name: string, userData?: any): ng.IHttpPromise<T>;
        logout<T>(): ng.IHttpPromise<T>; //TODO double check the type of the response

        /**
         * $auth.isAuthenticated()
         * 
         * Returns true if a JWT is present in Local Storage and it is not expired, otherwise returns false.
         * 
         * :exclamation: Note: This method expects the exp claim to check for the expiration time.
         * 
         * Usage
         * 
         *      // Controller
         *      $scope.isAuthenticated = function() {
         *          return $auth.isAuthenticated();
         *      };
         * 
         *      <!-- Template -->
         *      <ul class="nav navbar-nav pull-right" ng-if="!isAuthenticated()">
         *          <li><a href="/#/login">Login</a></li>
         *          <li><a href="/#/signup">Sign up</a></li>
         *      </ul>
         *      <ul class="nav navbar-nav pull-right" ng-if="isAuthenticated()">
         *          <li><a href="/#/logout">Logout</a></li>
         *      </ul>
         */
        isAuthenticated():boolean;
        link<T>(provider, userData?: any):ng.IHttpPromise<T>;
        unlink(provider: string): ng.IHttpPromise<void>;
        getToken():string;
        getPayload():string;
        setToken(token: string, isLinking?: boolean);
        removeToken();
    }
}