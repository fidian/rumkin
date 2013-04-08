/* Rainbow text generator
 * Copyright 2012 Tyler Akins
 * http://rumkin.com/license.html
 */
/*global angular, autoloader, util*/
(function () {
	'use strict';

	autoloader.angularModules.push('rainbow');
	autoloader.onload.push(function () {
		angular.module('rainbow', []).controller("RainbowController", ['$scope', function ($scope) {
			function makeHtml() {
				var input, output;

				input = $scope.input;
				output = '';

				function colorHex(i, mult) {
					var pi, sv, dec;
					pi = 3.141592653;
					sv = i / (input.length / pi);
					sv += mult * (pi / 3);
					dec = Math.sin(sv);
					return util.hexByte(dec * dec * 255);
				}

				util.each(input.split(''), function (val, i) {
					var color;
					color = "#";
					color += colorHex(i, 1);
					color += colorHex(i, 0);
					color += colorHex(i, -1);

					output += '<span style="color:' + color + '">' + util.htmlencode(input.charAt(i)) + '</span>';
				});

				$scope.output = output;
			}

			$scope.input = '';
			makeHtml();

			$scope.$watch('input', makeHtml);
		}]);
	});
}());
