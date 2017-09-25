/**
 * Created by mf57 on 03.09.2016.
 */
(function () {
    'use strict';
    angular
        .module('NotificationModule', ['toastr'])
        .config(ToastrConfig);


    ToastrConfig.$inject = ['toastrConfig'];
    function ToastrConfig(toastrConfig) {
        angular.extend(toastrConfig, {
            autoDismiss: false,
            containerId: 'toast-container',
            newestOnTop: true,
            positionClass: 'toast-top-full-width',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            target: 'body',
            timeOut: 1500,
            extendedTimeOut: 500
        });
    }

})();