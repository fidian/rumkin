/*global window*/
(function () {
	'use strict';
	window.angularAutoload = {
		"angular": {
			"js": "/js/angular/angular.min.js",
			"detect": [
				"ng-bind",
				"ng-bind-unsafe-html",
				"ng-model"
			]
		},
		"angular-ui": {
			"js": "/js/angular-ui/build/angular-ui.min.js",
			"css": "/js/angular-ui/build/angular-ui.min.css",
			"depends": [
				"angular",
				"jquery"
			]
		},
		"auto-grow": {
			"js": "/js/directives/auto-grow.js",
			"depends": "angular",
			"detect": "auto-grow"
		},
		"jquery": {
			"js": "/js/jquery-1.9.1.min.js"
		}
	};
}());
