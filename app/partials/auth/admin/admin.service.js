(function () {
    'use strict';
    angular
        .module('myApp')
        .factory('Admin', AdminService);


    AdminService.$inject = ['ApiUrls', '$resource'];
    function AdminService(ApiUrls, $resource) {
        const tokenUrl = ApiUrls.backendApi + "tokens/";
        const topicUrl = ApiUrls.backendApi + "topics/";
        const baseUrl = ApiUrls.backendApi;

        function loadAll() {
            return $resource(baseUrl + "groups/", {}, {
                'query': {
                    method: 'GET',
                    isArray: false
                }
            }).query();
        }

        function createTokensForMails(token) {
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

        function createTokensForGroups(token) {
            return $resource(tokenUrl + "groups", {}, {
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
            createTokensForMails: createTokensForMails,
            createTokensForGroups: createTokensForGroups,
            open: open,
            wontFix: wontFix,
            resolve: resolve
        };

    }


})();