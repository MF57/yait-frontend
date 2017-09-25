/**
 * Created by mf57 on 03.09.2016.
 */
(function () {
    'use strict';
    angular
        .module('AuthModule')
        .factory('TokenStorage', TokenStorage);


    TokenStorage.$inject = ['$window'];
    function TokenStorage($window) {
        var storageKey = 'auth_token';
        return {
            store: function (token) {
                return localStorage.setItem(storageKey, token);
            },
            retrieve: function () {
                return localStorage.getItem(storageKey);
            },
            clear: function () {
                return localStorage.removeItem(storageKey);
            },
            decode: function (token) {
                if (token === null) {
                    return null;
                }
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace('-', '+').replace('_', '/');
                return JSON.parse($window.atob(base64));
            },
            isAuthenticated: function() {
                return !(localStorage.getItem(storageKey) === null);
            }
        };
    }




})();