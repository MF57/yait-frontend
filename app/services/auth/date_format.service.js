(function () {
    'use strict';
    angular
        .module('AuthModule')
        .service('DateFormat', DateFormat);

    DateFormat.$inject = [];
    function DateFormat() {

        function formatDate(date) {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const hour = date.getHours();
            const minute = date.getMinutes();
            const second = date.getSeconds();

            return year + "-" + addZero(month) + "-" + addZero(day) + " " + addZero(hour) + ":" + addZero(minute) + ":" + addZero(second);
        }

        function addZero(number) {
            if (number < 10) {
                return '0' + number;
            } else {
                return number;
            }
        }

        return {
            formatDate: formatDate
        }
    }

})();