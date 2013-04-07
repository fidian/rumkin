/*global AngularAutoloader*/
(function () {
	'use strict';
	var autoloader;
	autoloader = new AngularAutoloader({
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
			"module": "ui",
			"depends": [
				"angular",
				"jquery"
			]
		},
		"auto-grow": {
			"js": "/js/directives/auto-grow.js",
			"module": "autoGrow",
			"depends": "angular",
			"detect": "auto-grow"
		},
		"jquery": {
			"js": "/js/jquery-1.9.1.min.js"
		}
	});
	autoloader.init();
}());
