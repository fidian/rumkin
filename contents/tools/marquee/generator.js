/**
 * JavaScript Marquee Generator
 * Copyright 2012 Tyler Akins
 * http://rumkin.com/license.html
 */
/*global angular, util, window*/
(function () {
	'use strict';

	var hideMethods, showMethods;

	window.generator = {
		depends: {},
		show: {},
		hide: {}
	};

	angular.module('generator', []).directive("generator", function () {
		return {
			link: function ($scope, element, attrs) {
			}
		};
	});
}());
