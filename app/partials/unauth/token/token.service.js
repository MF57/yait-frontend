(function () {
    'use strict';
    angular
        .module('myApp')
        .factory('Token', TokenService);


    TokenService.$inject = ['ApiUrls', '$resource'];
    function TokenService(ApiUrls, $resource) {
        const tokenUrl = ApiUrls.backendApi + "tokens";
        const topicUrl = ApiUrls.backendApi + "topics";

        function getToken(tokenId) {
            return $resource(tokenUrl + '/' + tokenId, {}, {
                'query': { method: 'GET', isArray: false}
            }).query();
        }

        function getTopics() {
            return $resource(topicUrl + "/active", {}, {
                'query': { method: 'GET',  isArray: true}
            }).query();
        }


        function vote(vote, issueId) {
            return $resource(topicUrl + '/' + issueId, {}, {
                'create': {
                    method: 'POST',
                    isArray: false,
                    responseType: 'text',
                    transformResponse: function (data, headersGetter, status) {
                        return {content: data};
                    }
                }
            }).create(vote);
        }


        return {
            getToken: getToken,
            getTopics: getTopics,
            vote: vote
        };

    }


})();