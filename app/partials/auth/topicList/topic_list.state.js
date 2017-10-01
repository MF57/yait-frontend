(function () {
    'use strict';
    angular
        .module('myApp')
        .config(StateConfig);

    StateConfig.$inject = ['$stateProvider'];
    function StateConfig($stateProvider) {

        $stateProvider
            .state('TopicList', {
                url:"/topicList",
                templateUrl: "partials/auth/topicList/topic_list.html",
                controller: "TopicListCtrl",
                controllerAs: "vm",
                parent:"main"
            })

    }

})();