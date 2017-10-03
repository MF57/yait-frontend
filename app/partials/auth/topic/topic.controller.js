/**
 * Created by mf57 on 17.10.2016.
 */
(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('TopicCtrl', TopicController);

    TopicController.$inject = ['$stateParams', '$state', 'TokenStorage', 'Topic'];
    function TopicController($stateParams, $state, TokenStorage, Topic) {
        const vm = this;
        vm.issue = {};
        vm.newPost = '';
        vm.login = TokenStorage.decode(TokenStorage.retrieve()).username;
        vm.hasAlreadyCommented = true;
        vm.posts = [];
        vm.addPost = addPost;

        function addPost() {
            Topic.createPost({
                authorId: vm.login,
                content: vm.newPost
            }, vm.issue.id).$promise.then(successCallback, failureCallback);


            function successCallback(data) {
                vm.posts.push({
                    id: data,
                    topicId: vm.issue.id,
                    authorId: vm.login,
                    content: vm.newPost
                });
                vm.hasAlreadyCommented = true;
            }

            function failureCallback(error) {
                console.log("Error while retrieving data")
            }

        }


        function loadAll() {
            Topic.getIssue($stateParams.topicId)
                .$promise.then(issueSuccessCallback, failureCallback);


            function issueSuccessCallback(data) {
                vm.issue = data;
                Topic.getPosts($stateParams.topicId)
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

        loadAll();
    }


})();