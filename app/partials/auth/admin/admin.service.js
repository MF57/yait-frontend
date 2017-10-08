(function () {
    'use strict';
    angular
        .module('myApp')
        .factory('Admin', AdminService);


    AdminService.$inject = ['ApiUrls', '$resource'];
    function AdminService(ApiUrls, $resource) {
        const tokenUrl = ApiUrls.backendApi + "tokens/";
        const topicUrl = ApiUrls.backendApi + "topics/";

        function loadAll() {
            return $resource(tokenUrl, {}, {
                'query': { method: 'GET'}
            }).query();
        }

        function createTokens(token) {
            return $resource(tokenUrl + "mails", {}, {
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

        function open(issueId) {
            return $resource(topicUrl + issueId + "/open", {}, {
                'open': {
                    method: 'POST',
                }
            }).open({});
        }

        function wontFix(issueId) {
            return $resource(topicUrl + issueId + "/wontfix", {}, {
                'wontFix': {
                    method: 'POST',
                }
            }).wontFix({});
        }

        function resolve(issueId) {
            return $resource(topicUrl + issueId + "/close", {}, {
                'resolve': {
                    method: 'POST',
                }
            }).resolve({});
        }


        return {
            loadAll: loadAll,
            createTokens: createTokens,
            open: open,
            wontFix: wontFix,
            resolve: resolve
        };

    }


})();