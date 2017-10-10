(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('TokenCtrl', TokenController);

    TokenController.$inject = ['Token', '$state', '$stateParams', '$scope'];
    function TokenController(Token, $state, $stateParams, $scope) {
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
                vm.issues.sort((a,b) => b.votes.length - a.votes.length);
            }

            function failureCallback() {
                console.log("Error while retrieving data")
            }
        }

        function goToIssue(issueId) {
            $state.go('TokenTopic', {'topicId' : issueId, 'tokenId': $stateParams.tokenId})
        }


        function loadAll() {
            Token.getTopics().$promise.then(successCallback, failureCallback);


            function successCallback(data) {
                vm.issues = data.sort((a,b) => b.votes.length - a.votes.length);
            }

            function failureCallback() {
                console.log("Error while retrieving data")
            }
        }



        vm.loadAll();

    }

})();

