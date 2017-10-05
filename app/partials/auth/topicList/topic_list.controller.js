(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('TopicListCtrl', TopicListController);

    TopicListController.$inject = ['TopicList', 'ngDialog', '$state', 'TokenStorage'];
    function TopicListController(TopicList, ngDialog, $state, TokenStorage) {
        const vm = this;
        vm.isAdmin = TokenStorage.isAdmin();
        vm.login = TokenStorage.decode(TokenStorage.retrieve()).username;
        vm.loadAll = loadAll;
        vm.showCreateIssuePopup = showCreateIssuePopup;
        vm.goToIssue = goToIssue;
        vm.issues = [];



        function showCreateIssuePopup() {
            const dialog = ngDialog.open({
                controller: "NewTopicCtrl",
                controllerAs: "vm",
                template: "partials/auth/newTopic/new_topic.html",
                className: "ngdialog-theme-default welcome-dialog new-topic-dialog",
                width: "100%"
            });
            dialog.closePromise.then((newIssue) => {
                TopicList.create({
                    title: newIssue.value.title,
                    description: newIssue.value.description,
                    authorId: vm.login
                }).$promise.then(successCallback, failureCallback);

                function successCallback(data) {
                    vm.issues.push({
                        id: data.content,
                        title: newIssue.value.title,
                        description: newIssue.value.description,
                        authorId: vm.login,
                        votes: []
                    })
                }

                function failureCallback(error) {
                    console.log("Error while retrieving data")
                }
            })
        }

        function goToIssue(issueId) {
            $state.go('Topic', {'topicId' : issueId})

        }

        function loadAll() {
            TopicList.loadAll().$promise.then(successCallback, failureCallback);


            function successCallback(data) {
                vm.issues = data;
            }

            function failureCallback(error) {
                console.log("Error while retrieving data")
            }
        }


        vm.loadAll();
    }

})();

