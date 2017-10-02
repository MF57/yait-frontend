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


        //remove it
        function makeId() {
            let text = "";
            const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (let i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }

        function createIssue() {
            ngDialog.close('', {
                id: makeId(),
                title: vm.title,
                description: vm.description
            });
        }


    }

})();

