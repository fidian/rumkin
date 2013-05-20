/**
 * Rainbow text generator
 * Copyright 2013 Tyler Akins
 * http://rumkin.com/license.html
 */
/*global angular, util*/
(function () {
	'use strict';

	function makeHtml(input) {
		var output;

		function colorHex(i, mult) {
			var pi, sv, dec;
			pi = 3.141592653;
			sv = i / (input.length / pi);
			sv += mult * (pi / 3);
			dec = Math.sin(sv);
			return util.hexByte(dec * dec * 255);
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
			return '<span style="color:' + color + '">' + util.htmlencode(c) + '</span>';
		}).join('');

		return output;
	}

	angular.module('rainbow', ['autoGrow']).directive("rainbow", function () {
		return {
			link: function ($scope, element, attrs) {
				$scope.input = '';
				$scope.output = '';

				$scope.$watch('input', function (newVal) {
					$scope.output = makeHtml(newVal);
				});
			}
		};
	});
}());
