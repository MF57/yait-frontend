(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('AdminCtrl', AdminController);

    AdminController.$inject = ['Admin', '$state', 'ngDialog'];
    function AdminController(Admin, $state, ngDialog) {
        const vm = this;
        vm.loadAll = loadAll;
        vm.mails = "";
        vm.token = {};
        vm.sendTokens = sendTokens;

        function sendTokens() {
           vm.token.validUntil = $('#datetimepicker').data("DateTimePicker").date().valueOf();
           vm.token.mails = vm.mails.split(",");

            const dialog = ngDialog.open({
                controller: "SendTokensCtrl",
                controllerAs: "vm",
                template: "partials/auth/admin/sendTokens/send_tokens.html",
                className: "ngdialog-theme-default welcome-dialog confirmation-dialog",
                width: "100%",
                data: {
                    token: vm.token
                }
            });

           // Admin.createTokens(vm.token).$promise.then(successCallback, failureCallback);
           //  function successCallback(data) {
           //      alert('Tokens created')
           //  }
           //
           //  function failureCallback(error) {
           //      console.log("Error while retrieving data")
           //  }

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

