/*global angular*/
(function () {
    'use strict';

    angular.module('randomLine', []).directive('randomLine', [
        '$http',
        function ($http) {
            return {
                link: function ($scope, $element, $attrs) {
                    /*jslint unparam:true*/
                    $element.text('');

                    $http.get($attrs.randomLine, {
                        cache: true
                    }).then(function (response) {
                        var index, list;

                        list = response.data.replace(/^[ \t\r\n]*|[ \t\r\n]$/g, '').split(/[\r\n]+/);
                        index = Math.floor(list.length * Math.random());
                        $element.text(list[index]);
                    }, function () {
                        $element.text('Unable to retrieve list of lines');
                    });
                }
            };
        }
    ]);
}());
