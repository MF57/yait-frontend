(function () {
    'use strict';
    angular
        .module('myApp')
        .factory('TopicList', TopicListService);


    TopicListService.$inject = ['ApiUrls', '$resource'];
    function TopicListService(ApiUrls, $resource) {
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