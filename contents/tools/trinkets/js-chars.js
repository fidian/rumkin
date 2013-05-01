/**
 * Javascript Character Code
 * Copyright 2012 Tyler Akins
 * http://rumkin.com/license.html
 */
/*global angular, autoloader, util*/
(function () {
	'use strict';

	function makeOutput(input) {
		return input.split('').map(function (c) {
			var code;
			code = c.charCodeAt(0);
			return util.hexByte(code / 256) + util.hexByte(code % 256);
		}).join(' ');
	}


	angular.module('jsChars', ['autoGrow']).directive('jsChars', function () {
		return {
			link: function ($scope, element, attrs) {
				$scope.input = '';
				$scope.output = '';

				$scope.$watch('input', function (newVal) {
					$scope.output = makeOutput(newVal);
				});
			}
		};
	});
}());

