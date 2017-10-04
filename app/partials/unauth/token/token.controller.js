(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('TokenCtrl', TokenController);

    TokenController.$inject = ['Token', '$state', '$stateParams'];
    function TokenController(Token, $state, $stateParams) {
        const vm = this;
        vm.vote = vote;

        function vote() {

        }

    }

})();

