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
        vm.groups = $scope.ngDialogData.groups;
        vm.reject = reject;
        vm.confirm = confirm;


        function confirm() {
            vm.serverValidation = false;

            if (vm.groups.length === 0) {
                Admin.createTokensForMails(vm.token).$promise.then(successCallback, failureCallback);
            } else {
                Admin.createTokensForGroups({
                    groups: vm.groups,
                    validUntil: vm.token.validUntil,
                    votes: vm.token.votes
                }).$promise.then(successCallback, failureCallback);
            }

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

