/*global angular, AngularAutoloader, document, window*/
(function () {
	'use strict';
	var autoloader;
	autoloader = new AngularAutoloader({
		"angular": {
			"js": "/js/angular/angular.min.js",
			"detect": [
				"ng-click",
				"ng-controller",
				"ng-bind",
				"ng-bind-unsafe-html",
				"ng-model",
				"ng-repeat",
				"ng-submit"
			],
			"onload": function () {
				angular.bootstrap(document, autoloader.angularModules);
			}
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
	window.autoloader = autoloader;
}());
