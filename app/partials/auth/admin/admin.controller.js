(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('AdminCtrl', AdminController);

    AdminController.$inject = ['Admin', '$state', 'TokenStorage'];
    function AdminController(Admin, $state) {
        const vm = this;
        vm.loadAll = loadAll;
        vm.token = {};
        vm.sendTokens = sendTokens;

        function sendTokens() {
           vm.token.validUntil = $('#datetimepicker').data("DateTimePicker").date().valueOf();
           vm.token.mails = vm.token.mails.split(",");
           Admin.createTokens(vm.token).$promise.then(successCallback, failureCallback);
            function successCallback(data) {
                alert('Tokens created')
            }

            function failureCallback(error) {
                console.log("Error while retrieving data")
            }

        }

        function loadAll() {

            $('#datetimepicker').datetimepicker({
                inline: true,
                sideBySide: true
            });


           // Admin.loadAll().$promise.then(successCallback, failureCallback);


            function successCallback(data) {
            }

            function failureCallback(error) {
                console.log("Error while retrieving data")
            }
        }


        vm.loadAll();
    }

})();

