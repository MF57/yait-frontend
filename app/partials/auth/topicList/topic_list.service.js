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

        function create(issue) {
            return $resource(resourceUrl, {}, {
                'create': {
                    method: 'POST',
                    isArray: false,
                    responseType: 'text',
                    transformResponse: function(data, headersGetter, status) {
                        return {content: data};
                    }
                }
            }).create(issue);
        }

        return {
            loadAll: loadAll,
            create: create
        };

    }


})();