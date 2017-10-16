(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('ConfirmationCtrl', ConfirmationController);

    ConfirmationController.$inject = ['ngDialog', 'Admin', 'DateFormat', '$timeout', '$scope'];

    function ConfirmationController(ngDialog, Admin, DateFormat, $timeout, $scope) {
        const vm = this;
        vm.serverValidation = false;
        vm.successAction = false;
        vm.newState = $scope.ngDialogData.newState;
        vm.issueId = $scope.ngDialogData.issueId;
        vm.reject = reject;
        vm.confirm = confirm;


        function confirm() {
            vm.serverValidation = false;

            if (vm.newState === "WORK IN PROGRESS") {
                Admin.open(vm.issueId).$promise.then(successCallback, failureCallback);
            } else if (vm.newState === "WON'T FIX") {
                Admin.wontFix(vm.issueId).$promise.then(successCallback, failureCallback);
            } else if (vm.newState === "RESOLVED") {
                Admin.resolve(vm.issueId).$promise.then(successCallback, failureCallback);
            } else {
                failureCallback();
            }

            function successCallback() {
                vm.successAction = true;
                $timeout(function() {
                    ngDialog.close('',
                        {
                            result: true
                        });
                }, 1000);
            }


            function failureCallback(error) {
                vm.serverValidation = true;
                $timeout(function () {
                    ngDialog.close('', {
                        result: false
                    });
                }, 1000);
                console.log("Error while retrieving data")
            }
        }

        function reject() {
            ngDialog.close();
        }



    }

})();

