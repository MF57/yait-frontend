(function () {
    'use strict';
    angular
        .module('myApp')
        .factory('TokenTopic', TokenTopicService);


    TokenTopicService.$inject = ['ApiUrls', '$resource'];
    function TokenTopicService(ApiUrls, $resource) {
        const tokenUrl = ApiUrls.backendApi + "tokens";
        const topicUrl = ApiUrls.backendApi + "topics";

        function getToken(tokenId) {
            return $resource(tokenUrl + '/' + tokenId, {}, {
                'query': { method: 'GET', isArray: false}
            }).query();
        }

        function getIssue(issueId) {
            return $resource(resourceUrl + '/' + issueId, {}, {
                'query': { method: 'GET', isArray: false}
            }).query();
        }

        function getPosts(issueId) {
            return $resource(resourceUrl + '/' + issueId + "/posts", {}, {
                'query': { method: 'GET', isArray: true}
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
            getIssue: getIssue,
            getPosts: getPosts,
            getToken: getToken,
            vote: vote
        };

    }


})();