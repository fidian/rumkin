/*global autoloader, fortunes, angular*/
(function () {
	'use strict';

	autoloader.angularModules.push('fortune');
	autoloader.onload.push(function () {
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
	});
}());
