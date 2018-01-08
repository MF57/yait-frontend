(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('ExpirationCtrl', ExpirationController);

    ExpirationController.$inject = ['ngDialog', 'Admin', 'DateFormat', '$timeout', '$scope', '$state'];

    function ExpirationController(ngDialog, Admin, DateFormat, $timeout, $scope, $state) {
        const vm = this;
        vm.finishedVoting = $scope.ngDialogData.finishedVoting;
        vm.confirm = confirm;


        function confirm() {
            ngDialog.close();
            $state.go('welcome');
        }





    }

})();

