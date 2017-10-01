(function () {
    'use strict';
    angular
        .module('myApp')
        .config(StateConfig);

    StateConfig.$inject = ['$stateProvider'];
    function StateConfig($stateProvider) {

        $stateProvider
            .state('Admin', {
                url:"/admin",
                templateUrl: "partials/auth/admin/admin.html",
                controller: "AdminCtrl",
                controllerAs: "vm",
                parent:"main",
                resolve: {
                    security: SecureState
                }
            });


        SecureState.$inject = ['$q', 'TokenStorage'];
        function SecureState($q, TokenStorage) {
            if (!TokenStorage.isAdmin()) {
                return $q.reject("Not Allowed");
            }
        }

    }

})();