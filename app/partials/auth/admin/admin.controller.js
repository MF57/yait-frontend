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
        vm.validation = false;
        vm.groups = [];

        function sendTokens() {
            vm.validation = false;
           vm.token.validUntil = $('#datetimepicker').data("DateTimePicker").date().valueOf();
           vm.token.mails = vm.mails.split(",");

           if (new Date().valueOf() > vm.token.validUntil || vm.token.mails.length <= 0 || vm.token.votes <= 0) {
               vm.validation = true;
               return;
           }

            ngDialog.open({
                controller: "SendTokensCtrl",
                controllerAs: "vm",
                template: "partials/auth/admin/sendTokens/send_tokens.html",
                className: "ngdialog-theme-default welcome-dialog confirmation-dialog",
                width: "100%",
                data: {
                    token: vm.token
                }
            });


        }

        function loadAll() {

            $('#datetimepicker').datetimepicker({
                inline: true,
                sideBySide: true
            });


            Admin.loadAll().$promise.then(successCallback, failureCallback);


            function successCallback(data) {
                vm.groups = data.groups;
            }

            function failureCallback(error) {
                console.log("Error while retrieving data")
            }
        }


        vm.loadAll();
    }

})();

