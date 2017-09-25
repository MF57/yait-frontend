/**
 * Created by mf57 on 03.09.2016.
 */
(function () {
    'use strict';
    angular
        .module('myApp')
        .config(StateConfig);


    /*
     Please use this $stateProvider only for abstract states. Standard states should be in partials folder
     */
    StateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function StateConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");


        $stateProvider
            .state('unauth', {
                abstract: true,
                templateUrl: "layouts/unauth/main.html"
            })
            .state('main', {
                abstract: true,
                templateUrl: "layouts/auth/navbar.html",
                controller: "NavbarController",
                controllerAs: "vm",
                resolve: {
                    security: SecureState
                }
            });

    }

    SecureState.$inject = ['$q', 'TokenStorage'];
    function SecureState($q, TokenStorage) {
        if (!TokenStorage.isAuthenticated()) {
            return $q.reject("Not Authorized");
        }
    }


})();