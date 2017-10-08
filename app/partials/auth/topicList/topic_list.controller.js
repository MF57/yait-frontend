(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('TopicListCtrl', TopicListController);

    TopicListController.$inject = ['TopicList', 'ngDialog', '$state', 'TokenStorage', 'Admin'];
    function TopicListController(TopicList, ngDialog, $state, TokenStorage, Admin) {
        const vm = this;
        vm.isAdmin = TokenStorage.isAdmin();
        vm.login = TokenStorage.decode(TokenStorage.retrieve()).username;
        vm.loadAll = loadAll;
        vm.showCreateIssuePopup = showCreateIssuePopup;
        vm.goToIssue = goToIssue;
        vm.startWorkingOnIssue = startWorkingOnIssue;
        vm.resolveIssue = resolveIssue;
        vm.wontFixIssue = wontFixIssue;
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
                if (newIssue.value.title !== "" && newIssue.value.description) {
                    TopicList.create({
                        title: newIssue.value.title,
                        description: newIssue.value.description,
                        authorId: vm.login
                    }).$promise.then(successCallback, failureCallback);
                }

                function successCallback(data) {
                    vm.issues.push({
                        id: data.content,
                        title: newIssue.value.title,
                        description: newIssue.value.description,
                        authorId: vm.login,
                        state: "Opened",
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

        function startWorkingOnIssue(issue) {
            Admin.open(issue.id).$promise.then(successCallback, failureCallback);


            function successCallback(data) {
                issue.state = "WorkInProgress"
            }

            function failureCallback(error) {
                console.log("Error while retrieving data")
            }
        }

        function wontFixIssue(issue) {
            Admin.wontFix(issue.id).$promise.then(successCallback, failureCallback);


            function successCallback(data) {
                issue.state = "WontFix"
            }

            function failureCallback(error) {
                console.log("Error while retrieving data")
            }
        }

        function resolveIssue(issue) {
            Admin.resolve(issue.id).$promise.then(successCallback, failureCallback);


            function successCallback(data) {
                issue.state = "WontFix"
            }

            function failureCallback(error) {
                console.log("Error while retrieving data")
            }
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

