(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('SendTokensCtrl', SendTokensController);

    SendTokensController.$inject = ['ngDialog', 'Admin', 'DateFormat', '$timeout', '$scope'];

    function SendTokensController(ngDialog, Admin, DateFormat, $timeout, $scope) {
        const vm = this;
        vm.serverValidation = false;
        vm.successAction = false;
        vm.token = $scope.ngDialogData.token;
        vm.reject = reject;
        vm.confirm = confirm;


        function confirm() {
            vm.serverValidation = false;

            Admin.createTokens(vm.token).$promise.then(successCallback, failureCallback);

            function successCallback() {
                vm.successAction = true;
                $timeout(function() {
                    ngDialog.close();
                }, 1000);
            }


            function failureCallback(error) {
                vm.serverValidation = true;
                console.log("Error while retrieving data")
            }
        }

        function reject() {
            ngDialog.close();
        }



    }

})();

