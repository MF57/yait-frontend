/**
 * Created by mf57 on 25.09.2016.
 */
(function () {
    'use strict';
    angular
        .module('AuthModule')
        .factory('LoginService', LoginService);

    LoginService.$inject = ['$resource', 'TokenStorage', 'ApiUrls'];

    function LoginService ($resource, TokenStorage, ApiUrls) {
        const service = {
            login: login,
            logout: logout,
            loginRemote: loginRemote
        };

        const loginUrl = ApiUrls.authlogApi + "login/credentials";

        function login(login, password) {
            return $resource(loginUrl, {}, {
                'query': {
                    method: 'GET',
                    headers: {"Authorization": btoa(login + ":" + password)}
                }
            }).query();
        }

        const loginRemoteUrl = ApiUrls.authlogApi + "/login/remoteUser";


        function loginRemote() {
            return $resource(loginRemoteUrl, {}, {
                'query': {
                    method: 'GET',
                }
            }).query();
        }

        function logout() {
            TokenStorage.clear();
        }


        return service;

    }
    

})();