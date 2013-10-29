/*global angular, fortunes*/
(function () {
    'use strict';

    angular.module('fortune', []).controller("FortuneController", ['$scope', function ($scope) {
        function pickNewFortune(list) {
            var i;
            i = Math.floor(list.length * Math.random());
            return list[i];
        }

        $scope.fortunes = fortunes;
        $scope.current = pickNewFortune($scope.fortunes);
        $scope.another = function () {
            $scope.current = pickNewFortune($scope.fortunes);
        };
    }]);
}());
