(function () {
    'use strict';
    angular
        .module('myApp')
        .factory('Topic', TopicService);


    TopicService.$inject = ['ApiUrls', '$resource'];
    function TopicService(ApiUrls, $resource) {
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