(function () {
    'use strict';
    angular
        .module('myApp')
        .factory('TopicList', TopicListService);


    TopicListService.$inject = ['ApiUrls', '$resource'];
    function TopicListService(ApiUrls, $resource) {
        const resourceUrl = ApiUrls.backendApi + "topics";

        function loadAll() {
            return $resource(resourceUrl, {}, {
                'query': { method: 'GET',  isArray: true}
            }).query();
        }

        return {
            loadAll: loadAll
        };

    }


})();