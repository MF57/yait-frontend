(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('TokenNavbarController', TokenNavbarController);

    TokenNavbarController.$inject = ['$state', '$stateParams', 'Token'];

    function TokenNavbarController($state, $stateParams, Token) {
        const vm = this;
        vm.token = {};
        vm.loadAll = loadAll;
        vm.goToWelcome = goToWelcome;


        function goToWelcome() {
            $state.go("welcome");
        }


        function loadAll() {
            Token.getToken($stateParams.tokenId).$promise.then(successCallback, failureCallback);


            function successCallback(data) {
                if (typeof data.token !== 'undefined') {
                    vm.token = data;
                } else {
                    $state.go('welcome');
                }
            }

            function failureCallback(error) {
                $state.go('welcome');
            }
        }


        vm.loadAll();

    }

})();