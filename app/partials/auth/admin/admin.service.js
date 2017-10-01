(function () {
    'use strict';
    angular
        .module('myApp')
        .factory('Admin', AdminService);


    AdminService.$inject = ['ApiUrls', '$resource'];
    function AdminService(ApiUrls, $resource) {
        const resourceUrl = ApiUrls.enrollmentApi + "tournaments/my";

        function loadAll() {
            return $resource(resourceUrl, {}, {
                'query': { method: 'GET'}
            }).query();
        }

        return {
            loadAll: loadAll
        };

    }


})();