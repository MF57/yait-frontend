(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['TokenStorage', 'LoginService', 'UserService', '$state'];
    function NavbarController(TokenStorage, LoginService, UserService, $state) {
        var vm = this;
        
        vm.isAuthenticated = TokenStorage.isAuthenticated();
        vm.username = TokenStorage.decode(TokenStorage.retrieve()).username;
        vm.logoutFunction = logoutFunction;
        vm.loadAll = loadAll;
        vm.goToState = goToState;
        vm.menuExpanded = true;
        vm.stateActive = 'Dashboard';

        function goToState(state) {
            vm.stateActive = state;
            $state.go(state);
        }

        function loadAll() {
            UserService.getUser(vm.username).$promise.then(successCallback, failureCallback);

            function successCallback(result) {
                vm.userData = result;
                vm.userPictureUrl = vm.userData.pictureURL;
            }

            function failureCallback(result) {
                console.log("Can't get user data.")
            }

        }

        function logoutFunction() {
            LoginService.logout();
        }


        loadAll();


    }

})();