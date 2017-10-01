(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('AdminCtrl', AdminController);

    AdminController.$inject = ['Admin', '$state', 'TokenStorage'];
    function AdminController(Admin, $state) {
        const vm = this;
        vm.loadAll = loadAll;


        function loadAll() {
            Admin.loadAll().$promise.then(successCallback, failureCallback);


            function successCallback(data) {
            }

            function failureCallback(error) {
                console.log("Error while retrieving data")
            }
        }


        vm.loadAll();
    }

})();

