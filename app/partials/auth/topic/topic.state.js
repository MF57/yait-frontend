(function () {
    'use strict';

    angular
        .module('myApp')
        .config(StateConfig);

    StateConfig.$inject = ['$stateProvider'];
    function StateConfig($stateProvider) {

        $stateProvider
            .state('Topic', {
                url:"/topic/{topicId}",
                templateUrl: "partials/auth/topic/topic.html",
                controller: "TopicCtrl",
                controllerAs: "vm",
                parent:"main",
                params: {
                    topicId: ''
                }
            })

    }


})();