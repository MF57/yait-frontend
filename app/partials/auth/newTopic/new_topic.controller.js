(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('NewTopicCtrl', NewTopicController);

    NewTopicController.$inject = ['ngDialog'];
    function NewTopicController(ngDialog) {
        const vm = this;
        vm.title = '';
        vm.description = '';
        vm.formValidation = false;
        vm.createIssue = createIssue;


        function createIssue() {
            vm.formValidation = false;
            if (vm.title !== '' && vm.description !== '') {
                ngDialog.close('', {
                    title: vm.title,
                    description: vm.description
                });
            } else {
                vm.formValidation = true;
            }
        }


    }

})();

