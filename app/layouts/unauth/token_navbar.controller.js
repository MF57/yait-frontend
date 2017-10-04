(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('TokenNavbarController', TokenNavbarController);

    TokenNavbarController.$inject = ['$state'];

    function TokenNavbarController($state) {
        const vm = this;
        vm.goToWelcome = goToWelcome;

        function goToWelcome() {
            $state.go("welcome");
        }

    }

})();