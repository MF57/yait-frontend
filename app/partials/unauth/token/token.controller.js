(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('TokenCtrl', TokenController);

    TokenController.$inject = ['Token', '$state', '$stateParams'];
    function TokenController(Token, $state, $stateParams) {
        const vm = this;
        vm.vote = vote;
        vm.issues = [];
        vm.loadAll = loadAll;
        vm.goToIssue = goToIssue;

        function vote() {

        }

        function goToIssue(issueId) {
            $state.go('TokenTopic', {'topicId' : issueId, 'tokenId': $stateParams.tokenId})
        }


        function loadAll() {
            Token.getTopics().$promise.then(successCallback, failureCallback);


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

