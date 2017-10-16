(function () {
    'use strict';

    angular
        .module('myApp')
        .config(StateConfig);

    StateConfig.$inject = ['$stateProvider'];
    function StateConfig($stateProvider) {

        $stateProvider
            .state('Token', {
                url:"/topicList",
                templateUrl: "partials/unauth/token/token.html",
                controller: "TokenCtrl",
                controllerAs: "vm",
                parent:"token",
                params: {
                    tokenId: ''
                }
            })

    }


})();