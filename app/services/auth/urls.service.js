/**
 * Created by mf57 on 03.09.2016.
 */
(function () {
    'use strict';
    angular
        .module('AuthModule')
        .service('ApiUrls', ApiUrls);

    ApiUrls.$inject = ['$http'];
    function ApiUrls($http) {
        const authlog = "http://nat-1.d17.iisg.agh.edu.pl:60673/";
        const backend = "http://nat-1.d17.iisg.agh.edu.pl:60673/";
        const api = "";
        this.backendApi = backend;
        this.authlogApi = authlog + api;
        return this;
    }

})();