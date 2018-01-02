(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('TokenNavbarController', TokenNavbarController);

    TokenNavbarController.$inject = ['$state', '$stateParams', 'Token', '$scope', 'DateFormat'];

    function TokenNavbarController($state, $stateParams, Token, $scope, DateFormat) {
        const vm = this;
        vm.token = {};
        vm.loadAll = loadAll;
        vm.goToWelcome = goToWelcome;


        function goToWelcome() {
            $state.go("Token", {'tokenId': $stateParams.tokenId});
        }


        function loadAll() {
            Token.getToken($stateParams.tokenId).$promise.then(successCallback, failureCallback);


            function successCallback(data) {
                if (typeof data.token !== 'undefined') {
                    data.validUntil = DateFormat.formatDate(new Date(data.validUntil));
                    vm.token = data;
                    $scope.token = data;
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