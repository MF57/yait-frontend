(function () {
    'use strict';
    angular
        .module('myApp')
        .factory('Topic', TopicService);


    TopicService.$inject = ['ApiUrls', '$resource'];
    function TopicService(ApiUrls, $resource) {
        const resourceUrl = ApiUrls.backendApi + "topics";

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

        function createPost(post, issueId) {
            return $resource(resourceUrl + '/' + issueId + "/posts", {}, {
                'create': {
                    method: 'POST',
                    isArray: false,
                    responseType: 'text',
                    transformResponse: function (data, headersGetter, status) {
                        return {content: data};
                    }
                }
            }).create(post);
        }

        return {
            getIssue: getIssue,
            getPosts: getPosts,
            createPost: createPost
        };

    }


})();