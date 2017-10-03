(function () {
    'use strict';
    angular
        .module('myApp')
        .factory('Admin', AdminService);


    AdminService.$inject = ['ApiUrls', '$resource'];
    function AdminService(ApiUrls, $resource) {
        const resourceUrl = ApiUrls.backendApi + "tokens";

        function loadAll() {
            return $resource(resourceUrl, {}, {
                'query': { method: 'GET'}
            }).query();
        }

        function createTokens(token) {
            return $resource(resourceUrl + "/mails", {}, {
                'create': {
                    method: 'POST',
                    isArray: false,
                    responseType: 'text',
                    transformResponse: function (data, headersGetter, status) {
                        return {content: data};
                    }
                }
            }).create(token);
        }

        return {
            loadAll: loadAll,
            createTokens: createTokens
        };

    }


})();