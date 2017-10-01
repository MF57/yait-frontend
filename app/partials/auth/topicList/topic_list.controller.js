(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('TopicListCtrl', TopicListController);

    TopicListController.$inject = ['TopicList', '$state', 'TokenStorage'];
    function TopicListController(TopicList, $state) {
        const vm = this;
        vm.loadAll = loadAll;


        function loadAll() {
            TopicList.loadAll().$promise.then(successCallback, failureCallback);


            function successCallback(data) {
            }

            function failureCallback(error) {
                console.log("Error while retrieving data")
            }
        }


        vm.loadAll();
    }

})();

