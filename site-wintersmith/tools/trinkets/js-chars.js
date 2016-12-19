/**
 * JavaScript Character Code
 * Copyright 2013 Tyler Akins
 * http://rumkin.com/license.html
 */
/*global angular, futile*/
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
                return futile.hexByte(code / 256) + futile.hexByte(code % 256);
			}).join(' ');
		};
	});
}());

