(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('NewTopicCtrl', NewTopicController);

    NewTopicController.$inject = ['ngDialog', 'TopicList', 'DateFormat', '$timeout', 'TokenStorage'];

    function NewTopicController(ngDialog, TopicList, DateFormat, $timeout, TokenStorage) {
        const vm = this;
        vm.title = '';
        vm.description = '';
        vm.formValidation = false;
        vm.serverValidation = false;
        vm.issueCreatedSuccessfully = false;
        vm.login = TokenStorage.decode(TokenStorage.retrieve()).username;
        vm.createIssue = createIssue;


        function createIssue() {
            vm.formValidation = false;
            vm.serverValidation = false;
            if (vm.title !== '' && vm.description !== '') {
                sendRequest();

            } else {
                vm.formValidation = true;
            }
        }

        function sendRequest() {
            TopicList.create({
                title: vm.title,
                description: vm.description,
                authorId: vm.login
            }).$promise.then(successCallback, failureCallback);

            function successCallback(data) {
                vm.issueCreatedSuccessfully = true;
                $timeout(function () {
                    ngDialog.close('', {
                        id: data.content,
                        title: vm.title,
                        description: vm.description,
                        authorId: vm.login,
                        state: "Opened",
                        creationDate: DateFormat.formatDate(new Date()),
                        votes: []
                    });
                }, 1000);

            }

            function failureCallback(error) {
                vm.serverValidation = true;
                console.log("Error while retrieving data")
            }
        }


    }

})();

