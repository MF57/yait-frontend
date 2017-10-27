(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('TopicListCtrl', TopicListController);

    TopicListController.$inject = ['TopicList', 'DateFormat', 'ngDialog', '$state', 'TokenStorage', 'Admin'];

    function TopicListController(TopicList, DateFormat, ngDialog, $state, TokenStorage, Admin) {
        const vm = this;
        vm.isAdmin = TokenStorage.isAdmin();
        vm.login = TokenStorage.decode(TokenStorage.retrieve()).username;
        vm.loadAll = loadAll;
        vm.showCreateIssuePopup = showCreateIssuePopup;
        vm.goToIssue = goToIssue;
        vm.startWorkingOnIssue = startWorkingOnIssue;
        vm.resolveIssue = resolveIssue;
        vm.wontFixIssue = wontFixIssue;
        vm.changeTab = changeTab;
        vm.issues = [];
        vm.openedIssues = [];
        vm.workInProgressIssues = [];
        vm.wontFixIssues = [];
        vm.resolvedIssues = [];
        vm.activeTab = "Opened";

        function changeTab(tab) {
            vm.activeTab = tab;
        }


        function showCreateIssuePopup() {
            const dialog = ngDialog.open({
                controller: "NewTopicCtrl",
                controllerAs: "vm",
                template: "partials/auth/newTopic/new_topic.html",
                className: "ngdialog-theme-default welcome-dialog new-topic-dialog",
                width: "100%"
            });
            dialog.closePromise.then((newIssue) => {
                if (typeof newIssue.value.id !== "undefined") {
                    vm.issues.push(newIssue.value);
                    vm.openedIssues.push(newIssue.value);
                }
            })
        }

        function goToIssue(issueId) {
            $state.go('Topic', {'topicId': issueId})

        }

        function startWorkingOnIssue(issue) {
            const dialog = ngDialog.open({
                controller: "ConfirmationCtrl",
                controllerAs: "vm",
                template: "partials/auth/confirmation/confirmation.html",
                className: "ngdialog-theme-default welcome-dialog confirmation-dialog",
                width: "100%",
                data: {
                    newState: 'WORK IN PROGRESS',
                    issueId: issue.id
                }
            });
            dialog.closePromise.then((dialogResult) => {
                if (dialogResult.value.result) {
                    issue.state = "WorkInProgress";
                    removeIssue(vm.openedIssues, issue);
                    vm.workInProgressIssues.push(issue);
                }
            })
        }

        function wontFixIssue(issue) {
            const dialog = ngDialog.open({
                controller: "ConfirmationCtrl",
                controllerAs: "vm",
                template: "partials/auth/confirmation/confirmation.html",
                className: "ngdialog-theme-default welcome-dialog confirmation-dialog",
                width: "100%",
                data: {
                    newState: "WON'T FIX",
                    issueId: issue.id
                }
            });

            dialog.closePromise.then((dialogResult) => {
                if (dialogResult.value.result) {
                    issue.state = "WontFix";
                    removeIssue(vm.workInProgressIssues, issue);
                    removeIssue(vm.openedIssues, issue);
                    vm.wontFixIssues.push(issue);
                }
            })

        }

        function resolveIssue(issue) {
            const dialog = ngDialog.open({
                controller: "ConfirmationCtrl",
                controllerAs: "vm",
                template: "partials/auth/confirmation/confirmation.html",
                className: "ngdialog-theme-default welcome-dialog confirmation-dialog",
                width: "100%",
                data: {
                    newState: "RESOLVED",
                    issueId: issue.id
                }
            });

            dialog.closePromise.then((dialogResult) => {
                if (dialogResult.value.result) {
                    issue.state = "Closed";
                    removeIssue(vm.workInProgressIssues, issue);
                    vm.resolvedIssues.push(issue);
                }
            })
        }

        function removeIssue(issues, issue) {
            let index = issues.indexOf(issue);
            if (index !== -1) {
                issues.splice(index, 1);
            }
        }

        function loadAll() {
            TopicList.loadAll().$promise.then(successCallback, failureCallback);


            function successCallback(data) {
                vm.issues = data;
                vm.issues.forEach(issue => {
                    issue.creationDate = DateFormat.formatDate(new Date(issue.creationDate));
                });
                vm.openedIssues = filterByStatus(vm.issues, "Opened").sort((a, b) => b.votes.length - a.votes.length);
                vm.workInProgressIssues = filterByStatus(vm.issues, "WorkInProgress").sort((a, b) => b.votes.length - a.votes.length);
                vm.wontFixIssues = filterByStatus(vm.issues, "WontFix").sort((a, b) => b.votes.length - a.votes.length);
                vm.resolvedIssues = filterByStatus(vm.issues, "Closed").sort((a, b) => b.votes.length - a.votes.length);
            }

            function failureCallback(error) {
                console.log("Error while retrieving data")
            }

            function filterByStatus(issues, status) {
                return issues.filter(issue => issue.state === status)
            }
        }


        vm.loadAll();
    }

})();

