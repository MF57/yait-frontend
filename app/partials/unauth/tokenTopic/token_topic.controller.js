(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('TokenTopicCtrl', TokenTopicController);

    TokenTopicController.$inject = ['TokenTopic', '$state', '$stateParams', '$scope', 'DateFormat', 'ngDialog'];

    function TokenTopicController(TokenTopic, $state, $stateParams, $scope, DateFormat, ngDialog) {
        const vm = this;
        vm.vote = vote;
        vm.loadAll = loadAll;
        vm.canVote = canVote;
        vm.backToList = backToList;
        vm.issue = {
            votes: []
        };

        function canVote() {
            return vm.issue.votes.indexOf($scope.token.id) === -1
        }

        function backToList() {
            $state.go('Token', {'tokenId': $stateParams.tokenId})

        }

        function vote() {
            TokenTopic.vote({token: $stateParams.tokenId}, $stateParams.topicId).$promise.then(successCallback, failureCallback);

            function successCallback(data) {
                vm.issue.votes.push($scope.token.id);
                $scope.token.votesLeft -= 1;
                if ($scope.token.votesLeft === 0) {
                    displayMainMenuPopup(true);
                }
            }

            function failureCallback(error) {
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

        function loadAll() {
            TokenTopic.getIssue($stateParams.topicId)
                .$promise.then(issueSuccessCallback, failureCallback);


            function issueSuccessCallback(data) {
                vm.issue = data;
                vm.issue.creationDate = DateFormat.formatDate(new Date(vm.issue.creationDate));
                TokenTopic.getPosts($stateParams.topicId)
                    .$promise.then(postsSuccessCallback, failureCallback);

                function postsSuccessCallback(data) {
                    vm.posts = data.sort((a, b) => a.creationDate - b.creationDate);
                    if (vm.posts.filter(post => post.authorLogin === vm.login).length === 0) {
                        vm.hasAlreadyCommented = false;
                    }
                    vm.posts.forEach(post => post.creationDate = DateFormat.formatDate(new Date(post.creationDate)))


                }
            }

            function failureCallback(error) {
                console.log("Error while retrieving data");
            }
        }


        vm.loadAll();

    }

})();

