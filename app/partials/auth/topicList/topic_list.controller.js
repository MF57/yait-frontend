(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('TopicListCtrl', TopicListController);

    TopicListController.$inject = ['TopicList', 'ngDialog', '$state', 'TokenStorage'];
    function TopicListController(TopicList, ngDialog, $state, TokenStorage) {
        const vm = this;
        vm.loadAll = loadAll;
        vm.showCreateIssuePopup = showCreateIssuePopup;
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
                vm.issues.push(newIssue.value)
            })
        }

        function loadAll() {
            TopicList.loadAll().$promise.then(successCallback, failureCallback);


            function successCallback(data) {
            }

            function failureCallback(error) {
                console.log("Error while retrieving data")
            }
        }


        vm.loadAll();
    }

})();

