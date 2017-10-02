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
        const enrollment = "http://tmp-core.tegess.com:8093/";
        const core = "http://tmp-core.tegess.com:8092/";
        const stats = "http://tmp-stats.tegess.com:8094/";
        const authlog = "http://tmp-authlog.tegess.com:8090/";
        const backend = "http://localhost:8080/";
        const api = "api/";
        this.enrollmentApi = enrollment + api;
        this.backendApi = backend;
        this.coreApi = core + api;
        this.statsApi = stats + api;
        this.authlogApi = authlog + api;
        this.appId="57e7f07946e0fb000155789f";
        return this;
    }

})();