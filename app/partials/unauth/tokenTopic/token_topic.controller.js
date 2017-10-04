(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('TokenTopicCtrl', TokenTopicController);

    TokenTopicController.$inject = ['TokenTopic', '$state', '$stateParams'];

    function TokenTopicController(TokenTopic, $state, $stateParams) {
        const vm = this;
        vm.vote = vote;
        vm.loadAll = loadAll;

        function vote() {

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

