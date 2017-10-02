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
        vm.issue = {
            id: $stateParams.topicId,
            title: 'Test Issue',
            description: 'Test description'
        };
        vm.newPost = '';
        vm.hasAlreadyCommented = false;
        vm.posts = [];
        vm.addPost = addPost;

        function addPost() {
            vm.posts.push(vm.newPost);
            vm.hasAlreadyCommented = true;
        }


        function loadAll() {
            // Tournament.loadAll($stateParams.topicId, TokenStorage.decode(TokenStorage.retrieve()).username)
            //     .$promise.then(successCallback, failureCallback);


            function successCallback(data) {
                vm.topic = data;
            }

            function failureCallback(error) {
                console.log("Error while retrieving data")
            }
        }

        loadAll();
    }


})();