(function () {
    'use strict';

    angular
        .module('myApp')
        .config(StateConfig);

    StateConfig.$inject = ['$stateProvider'];
    function StateConfig($stateProvider) {

        $stateProvider
            .state('Token', {
                url:"/token/{tokenId}",
                templateUrl: "partials/unauth/token/Token.html",
                controller: "TokenCtrl",
                controllerAs: "vm",
                parent:"token",
                params: {
                    tokenId: ''
                }
            })

    }


})();