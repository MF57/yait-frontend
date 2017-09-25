/**
 * Created by mf57 on 04.09.2016.
 */
(function () {
    'use strict';
    angular
        .module('myApp')
        .config(StateConfig);
    
    StateConfig.$inject = ['$stateProvider'];
    function StateConfig($stateProvider) {

        $stateProvider
            .state('welcome', {
                url:"/",
                templateUrl: "partials/unauth/welcome/welcome.html",
                controller: "WelcomeController",
                controllerAs: 'vm',
                parent:"unauth"
            })
        
    }
    
})();