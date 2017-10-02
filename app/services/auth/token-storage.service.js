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
              //  var base64Url = token.split('.')[1];
              //  var base64 = base64Url.replace('-', '+').replace('_', '/');
              // return JSON.parse($window.atob(base64));
                let authorities = [];
                console.log(token);
                if (token.length > 2) {
                    authorities.push("ROLE_ADMIN");
                }
                return {
                    'username': 'Micro Fire',
                    'authorities': authorities
                }
            },
            isAuthenticated: function() {
                return !(localStorage.getItem(storageKey) === null);
            },
            isAdmin: function() {
                return this.decode(this.retrieve()).authorities.indexOf('ROLE_ADMIN') !== -1;
            }
        };
    }




})();