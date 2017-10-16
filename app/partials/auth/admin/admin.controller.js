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
        vm.selectGroup = selectGroup;
        vm.toggleGroup = toggleGroup;
        vm.validation = false;
        vm.groups = [];
        vm.selectedGroups = [];


        function selectGroup(group) {
            vm.selectedGroups.push(group);
        }

        function toggleGroup(group) {
            let index = vm.selectedGroups.indexOf(group);
            if (index > -1) {
                vm.selectedGroups.splice(index, 1);
            } else {
                vm.selectedGroups.push(group);
            }
        }

        function sendTokens() {
           vm.validation = false;
           vm.token.validUntil = $('#datetimepicker').data("DateTimePicker").date().valueOf();
           vm.token.mails = vm.mails.split(",");

           if (new Date().valueOf() > vm.token.validUntil || (vm.mails.length <= 0 && vm.selectedGroups.length === 0) || vm.token.votes <= 0) {
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
                    token: vm.token,
                    groups: vm.selectedGroups
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
                $state.go("welcome");
                console.log("Error while retrieving data")
            }
        }


        vm.loadAll();
    }

})();

