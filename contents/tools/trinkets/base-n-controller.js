/*global angular, autoloader*/
(function () {
	'use strict';

	autoloader.angularModules.push('base-n');
	autoloader.onload.push(function () {
		angular.module('base-n', []).controller("BaseNController", ['$scope', function ($scope) {
			var numList;

			numList = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

			function recalc() {
				var convertedNumber, i, idx, inBase, number, outBase, s;

				inBase = +$scope.inbase;
				outBase = +$scope.outbase;
				number = $scope.input.toUpperCase();
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

				$scope.output = s;
			}

			$scope.inbase = 10;
			$scope.outbase = 10;
			$scope.input = "";
			$scope.$watch('inbase', recalc);
			$scope.$watch('outbase', recalc);
			$scope.$watch('input', recalc);
		}]);
	});
}());

