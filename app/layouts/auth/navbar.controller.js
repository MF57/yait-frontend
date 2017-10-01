(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['TokenStorage', 'LoginService', '$state'];
    function NavbarController(TokenStorage, LoginService, $state) {
        const vm = this;

        vm.isAuthenticated = TokenStorage.isAuthenticated();
        vm.isAdmin = TokenStorage.isAdmin();
        vm.username = TokenStorage.decode(TokenStorage.retrieve()).username;
        vm.logoutFunction = logoutFunction;
        vm.goToState = goToState;
        vm.menuExpanded = true;
        vm.stateActive = 'TopicList';

        function goToState(state) {
            vm.stateActive = state;
            $state.go(state);
        }

        function logoutFunction() {
            LoginService.logout();
        }


    }

})();