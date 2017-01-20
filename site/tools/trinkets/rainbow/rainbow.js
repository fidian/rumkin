/**
 * Rainbow text generator
 * Copyright 2013 Tyler Akins
 * http://rumkin.com/license.html
 */
/*global angular, document*/
(function () {
    'use strict';

    function makeHtml(input) {
        var output;

        function colorHex(i, mult) {
            var pi, sv, dec, num, hex;
            pi = 3.141592653;
            sv = i / (input.length / pi);
            sv += mult * (pi / 3);
            dec = Math.sin(sv);
            num = Math.floor(dec * dec * 255);
            hex = '00' + num.toString(16);

            return hex.substr(hex.length - 2);
        }

        function htmlencode(str) {
            var div;

            div = document.createElement('div');
            div.appendChild(document.createTextNode(str));

            return div.innerHTML;
        }

        output = input.split('').map(function (c, i) {
            var color;

            if (c === ' ') {
                return c;
            }

            color = "#";
            color += colorHex(i, 1);
            color += colorHex(i, 0);
            color += colorHex(i, -1);
            return '<span style="color:' + color + '">' + htmlencode(c) + '</span>';
        }).join('');

        return output;
    }

    angular.module('rainbow', ['autoGrow']).directive("rainbow", [
        '$sce',
        function ($sce) {
            return {
                link: function ($scope) {
                    $scope.input = '';
                    $scope.output = '';
                    $scope.outputSafe = '';

                    $scope.$watch('input', function (newVal) {
                        $scope.output = makeHtml(newVal);
                        $scope.outputSafe = $sce.trustAsHtml($scope.output);
                    });
                }
            };
        }
    ]);
}());
