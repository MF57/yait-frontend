(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('WelcomeController', WelcomeController);

    WelcomeController.$inject = ['$state', '$timeout', 'ngDialog', 'TokenStorage', 'LoginService'];
    function WelcomeController($state, $timeout, ngDialog, TokenStorage, LoginService) {
        const vm = this;

        vm.isAuthenticated = TokenStorage.isAuthenticated();
        vm.login = "";
        vm.password = "";
        vm.blurry = false;
        vm.loginSuccessful = false;
        vm.loginFailed = false;
        vm.registerSuccessful = false;

        vm.loginFunction = loginFunction;
        vm.showLoginPopup = showLoginPopup;


        function showLoginPopup() {
            vm.blurry = true;
            const dialog = ngDialog.open({
                controller: "WelcomeController",
                controllerAs: "vm",
                template: "partials/unauth/login/login.html",
                className: "ngdialog-theme-default welcome-dialog",
                width: "100%"
            });
            dialog.closePromise.then(() => vm.blurry = false)
        }

        function loginFunction() {
            vm.loginFailed = false;
            
            LoginService.login(vm.login, vm.password)
                .$promise.then(successCallback, failureCallback);

            function successCallback(result) {
                TokenStorage.store(result.token);
                vm.loginSuccessful = true;
                $timeout(function () {
                    ngDialog.close();
                    vm.loginSuccessful = false;
                    $state.go("TopicList");
                }, 1000);
            }

            function failureCallback() {
                vm.loginFailed = true;
                TokenStorage.clear();
                vm.loginSuccessful = false;
            }
        }


    }

})();