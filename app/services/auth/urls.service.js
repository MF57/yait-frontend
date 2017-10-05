/**
 * Created by mf57 on 03.09.2016.
 */
(function () {
    'use strict';
    angular
        .module('AuthModule')
        .service('ApiUrls', ApiUrls);

    ApiUrls.$inject = [];
    function ApiUrls() {
        const authlog = "http://localhost:8080/";
        const backend = "http://localhost:8080/";
        const api = "";
        this.backendApi = backend;
        this.authlogApi = authlog + api;
        return this;
    }

})();