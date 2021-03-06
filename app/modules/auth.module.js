/**
 * Created by mf57 on 03.09.2016.
 */
(function () {
    'use strict';
    angular
        .module('AuthModule', ['ngResource'])
        .config(AuthConfig);


    AuthConfig.$inject = ['$httpProvider'];
    function AuthConfig($httpProvider) {
        /**
         * FYI
         * The custom "X-Requested-With" is a conventional header sent by browser clients,
         * and it used to be the default in Angular but they took it out in 1.3.0.
         * Spring Security responds to it by not sending a "WWW-Authenticate" header in a 401 response,
         * and thus the browser will not pop up an authentication dialog (which is desirable in our app since
         * we want to control the authentication).
         * @type {string}
         */
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        $httpProvider.interceptors.push('TokenAuthInterceptor');
    }

})();
