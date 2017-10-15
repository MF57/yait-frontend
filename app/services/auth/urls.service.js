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
        var self = this;
        const backendUrl = "http://localhost:8080/";

        self.backendApi = backendUrl;
        self.authlogApi = backendUrl;

        if (typeof window.backendUrl !== 'undefined') {
            self.backendApi = window.backendUrl;
            self.authlogApi = window.backendUrl;
        }
        return self;
    }

})();