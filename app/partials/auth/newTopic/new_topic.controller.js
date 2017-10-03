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
        vm.createIssue = createIssue;


        function createIssue() {
            ngDialog.close('', {
                title: vm.title,
                description: vm.description
            });
        }


    }

})();

