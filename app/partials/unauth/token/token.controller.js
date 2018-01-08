(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('TokenCtrl', TokenController);

    TokenController.$inject = ['Token', '$state', '$stateParams', '$scope', 'DateFormat', 'ngDialog'];
    function TokenController(Token, $state, $stateParams, $scope, DateFormat, ngDialog) {
        const vm = this;
        vm.vote = vote;
        vm.canVote = canVote;
        vm.issues = [];
        vm.loadAll = loadAll;
        vm.goToIssue = goToIssue;

        function canVote(issue) {
            return issue.votes.indexOf($scope.token.id) === -1
        }


        function vote(issue, $event) {
            $event.stopPropagation();
            Token.vote({token: $stateParams.tokenId}, issue.id).$promise.then(successCallback, failureCallback);


            function successCallback() {
                issue.votes.push($scope.token.id);
                $scope.token.votesLeft -= 1;
                if ($scope.token.votesLeft === 0) {
                    displayMainMenuPopup(true);
                }
            }

            function failureCallback() {
                $state.go('welcome');
            }
        }



        function displayMainMenuPopup(votingFinished) {
            ngDialog.open({
                controller: "ExpirationCtrl",
                controllerAs: "vm",
                template: "partials/unauth/expiration/expiration.html",
                className: "ngdialog-theme-default welcome-dialog expiration-dialog confirmation-dialog",
                width: "100%",
                data: {
                    'finishedVoting': true
                }
            });
        }

        function goToIssue(issueId) {
            $state.go('TokenTopic', {'topicId' : issueId, 'tokenId': $stateParams.tokenId})
        }


        function loadAll() {
            Token.getTopics().$promise.then(successCallback, failureCallback);


            function successCallback(data) {
                vm.issues = data.sort((a,b) => a.creationDate - b.creationDate);
                vm.issues.forEach(issue => {
                    issue.creationDate = DateFormat.formatDate(new Date(issue.creationDate));
                });
            }

            function failureCallback() {
                $state.go('welcome');
            }
        }



        vm.loadAll();

    }

})();

