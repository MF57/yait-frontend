/**
 * Created by mf57 on 03.09.2016.
 */
(function () {
    'use strict';
    angular
        .module('AuthModule')
        .factory('TokenAuthInterceptor', TokenAuthInterceptor)

    TokenAuthInterceptor.$inject = ['$q', 'TokenStorage'];
    function TokenAuthInterceptor($q, TokenStorage) {
        return {
            request: function (config) {
                var authToken = TokenStorage.retrieve();
                if (authToken) {
                    config.headers['X-AUTH-TOKEN'] = authToken;
                }
                return config;
            },
            responseError: function (error) {
                if (error.status === 401 || error.status === 403) {
                    TokenStorage.clear();
                }
                return $q.reject(error);
            }
        };
    }
    
})();
