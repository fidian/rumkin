/**
 * Javascript Character Code
 * Copyright 2012 Tyler Akins
 * http://rumkin.com/license.html
 */
/*global angular, autoloader, util*/
(function () {
	'use strict';

	angular.module('jsChars', ['autoGrow']).filter('jsChars', function () {
		return function (input) {
			if (input === undefined || input === '') {
				return '';
			}

			return input.split('').map(function (c) {
				var code;
				code = c.charCodeAt(0);
				return util.hexByte(code / 256) + util.hexByte(code % 256);
			}).join(' ');
		};
	});
}());

