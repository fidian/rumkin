/*global angular, autoloader, levenshtein*/
(function () {
	'use strict';

	autoloader.angularModules.push('levenshtein');
	autoloader.onload.push(function () {
		angular.module('levenshtein', []).controller("LevenshteinController", ['$scope', function ($scope) {
			function recalc() {
				$scope.result = levenshtein($scope.a, $scope.b);
			}

			$scope.a = "";
			$scope.b = "";
			recalc();

			$scope.$watch('a', recalc);
			$scope.$watch('b', recalc);
		}]);
	});
}());
