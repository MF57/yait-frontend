(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('ConfirmationCtrl', ConfirmationController);

    ConfirmationController.$inject = ['ngDialog', 'TopicList', 'DateFormat', '$timeout', '$scope'];

    function ConfirmationController(ngDialog, TopicList, DateFormat, $timeout, $scope) {
        const vm = this;
        vm.serverValidation = false;
        vm.successAction = false;
        vm.newState = $scope.ngDialogData.newState;



    }

})();

