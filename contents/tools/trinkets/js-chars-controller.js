/**
 * Javascript Character Code
 * Copyright 2012 Tyler Akins
 * http://rumkin.com/license.html
 */
/*global angular, autoloader, util*/
(function () {
	'use strict';

	autoloader.angularModules.push('js-chars');
	autoloader.onload.push(function () {
		angular.module('js-chars', []).controller("JsCharsController", ['$scope', function ($scope) {
			function makeOutput() {
				var c, i, len, o;

				o = '';
				len = $scope.input.length;

				for (i = 0; i < len; i += 1) {
					if (i) {
						o += ' ';
					}

					c = $scope.input.charCodeAt(i);
					o += util.hexByte(c / 256) + util.hexByte(c % 256);
				}

				$scope.output = o;
			}

			$scope.input = "";
			makeOutput();

			$scope.$watch('input', makeOutput);
		}]);
	});
}());

