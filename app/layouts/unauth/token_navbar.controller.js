(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('TokenNavbarController', TokenNavbarController);

    TokenNavbarController.$inject = ['$state', '$stateParams', 'Token', '$scope', 'DateFormat', 'ngDialog'];

    function TokenNavbarController($state, $stateParams, Token, $scope, DateFormat, ngDialog) {
        const vm = this;
        vm.token = {};
        vm.loadAll = loadAll;
        vm.goToWelcome = goToWelcome;


        function goToWelcome() {
            $state.go("Token", {'tokenId': $stateParams.tokenId});
        }


        function loadAll() {
            Token.getToken($stateParams.tokenId).$promise.then(successCallback, failureCallback);


            function successCallback(data) {
                if (typeof data.token !== 'undefined') {
                    if (data.validUntil - new Date().getMilliseconds() < 0  || data.votesLeft <= 0) {
                        ngDialog.open({
                            controller: "ExpirationCtrl",
                            controllerAs: "vm",
                            template: "partials/unauth/expiration/expiration.html",
                            className: "ngdialog-theme-default welcome-dialog confirmation-dialog expiration-dialog",
                            width: "100%",
                            data: {
                                'finishedVoting': false
                            }
                        });
                    } else {
                        data.validUntil = DateFormat.formatDate(new Date(data.validUntil));
                        vm.token = data;
                        $scope.token = data;
                    }
                } else {
                    $state.go('welcome');
                }
            }

            function failureCallback(error) {
                $state.go('welcome');
            }
        }


        vm.loadAll();

    }

})();