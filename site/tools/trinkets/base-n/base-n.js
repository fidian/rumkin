/**
 * Base-N Conversion
 * Copyright 2013 Tyler Akins
 * http://rumkin.com/license.html
 */
/*global angular*/
(function () {
    'use strict';

    var numList;

    numList = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    function recalc(inBase, outBase, number) {
        var convertedNumber, i, idx, s;

        inBase = +inBase;
        outBase = +outBase;
        number = number.toUpperCase();
        convertedNumber = 0;
        s = '';

        // Convert the input number
        for (i = 0; i < number.length; i += 1) {
            idx = numList.indexOf(number.charAt(i));

            if (idx >= 0) {
                convertedNumber *= inBase;
                convertedNumber += idx;
            }
        }

        // Convert to the output number base
        while (convertedNumber) {
            idx = convertedNumber % outBase;
            s = numList.charAt(idx) + s;
            convertedNumber -= idx;
            convertedNumber /= outBase;
        }

        // Handle zero, the only special case
        if (!s.length) {
            s = '0';
        }

        return s;
    }

    angular.module('baseN', []).directive("baseN", function () {
        return {
            link: function ($scope, element, attrs) {
                function update() {
                    $scope.output = recalc($scope.inbase, $scope.outbase, $scope.input);
                }

                $scope.inbase = 10;
                $scope.outbase = 10;
                $scope.input = '';
                $scope.output = '';
                $scope.$watch('inbase', update);
                $scope.$watch('outbase', update);
                $scope.$watch('input', update);
            }
        };
    });
}());

