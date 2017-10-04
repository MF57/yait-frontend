(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('TokenTopicCtrl', TokenTopicController);

    TokenTopicController.$inject = ['TokenTopic', '$state', '$stateParams', '$scope'];

    function TokenTopicController(TokenTopic, $state, $stateParams, $scope) {
        const vm = this;
        vm.vote = vote;
        vm.loadAll = loadAll;
        vm.canVote = canVote;
        vm.issue = {
            votes: []
        };

        function canVote() {
            return vm.issue.votes.indexOf($scope.token.id) === -1
        }

        function vote() {
            TokenTopic.vote({token: $stateParams.tokenId}, $stateParams.topicId).$promise.then(successCallback, failureCallback);

            function successCallback(data) {
                vm.issue.votes.push($scope.token.id);
                $scope.token.votesLeft -= 1;
            }

            function failureCallback(error) {
                console.log("Error while retrieving data")
            }
        }

        function loadAll() {
            TokenTopic.getIssue($stateParams.topicId)
                .$promise.then(issueSuccessCallback, failureCallback);


            function issueSuccessCallback(data) {
                vm.issue = data;
                TokenTopic.getPosts($stateParams.topicId)
                    .$promise.then(postsSuccessCallback, failureCallback);

                function postsSuccessCallback(data) {
                    vm.posts = data;
                    if (vm.posts.filter(post => post.authorId === vm.login).length === 0) {
                        vm.hasAlreadyCommented = false;
                    }


                }
            }

            function failureCallback(error) {
                console.log("Error while retrieving data")
            }
        }


        vm.loadAll();

    }

})();

