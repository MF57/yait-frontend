(function () {
    'use strict';

    angular
        .module('myApp')
        .config(StateConfig);

    StateConfig.$inject = ['$stateProvider'];
    function StateConfig($stateProvider) {

        $stateProvider
            .state('TokenTopic', {
                url:"/token/{tokenId}/topic/{topicId}",
                templateUrl: "partials/unauth/tokenTopic/token_topic.html",
                controller: "TokenTopicCtrl",
                controllerAs: "vm",
                parent: "token",
                params: {
                    tokenId: '',
                    topicId: ''
                }
            })

    }


})();