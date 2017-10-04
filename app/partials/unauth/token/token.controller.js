(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('TokenCtrl', TokenController);

    TokenController.$inject = ['Token', '$state', '$stateParams', 'TokenStorage'];
    function TokenController(Token, $state, $stateParams, TokenStorage) {
        const vm = this;
        vm.loadAll = loadAll;
        vm.token = {};
        vm.vote = vote;

        function vote() {

        }

        function loadAll() {
            Token.getToken($stateParams.tokenId).$promise.then(successCallback, failureCallback);


            function successCallback(data) {
                if (typeof data.token !== 'undefined') {
                    vm.token = data;
                    console.log(vm.token);
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

