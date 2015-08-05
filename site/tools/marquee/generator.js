/**
 * JavaScript Marquee Generator
 * Copyright 2012 Tyler Akins
 * http://rumkin.com/license.html
 */
/*global angular, util, window*/
(function () {
	'use strict';

	var module;

	window.generator = {
		depends: {},
		show: {},
		hide: {}
	};

	module = angular.module('generator', []);

	module.directive("generator", function () {
		return {
			link: function (scope) {
				function updatePreview() {
					var preview;

					preview = {
						message: scope.message,
						show: scope.showMethod,
						readDelay: scope.readDelay,
						hide: scope.hideMethod,
						betweenDelay: scope.betweenDelay
					};

					if (!preview.show) {
						preview.show = scope.showMethodList.none;
					}

					if (!preview.hide) {
						preview.hide = scope.showMethodList.none;
					}

                    console.log(preview);

					scope.preview = [
						preview
					];
				}

				scope.animationList = [];
				scope.depends = window.generator.depends;
				scope.hideMethodList = window.generator.hide;
				scope.showMethodList = window.generator.show;
				scope.$watch('betweenDelay', updatePreview);
				scope.$watch('readDelay', updatePreview);
				scope.$watch('message', updatePreview);
				scope.setHideMethod = function (method) {
					scope.hideMethod = method;
					updatePreview();
				};
				scope.setShowMethod = function (method) {
					scope.showMethod = method;
					updatePreview();
				};

			}
		};
	});

	module.directive('generatorMethod', function () {
		return {
			link: function (scope) {
				scope.$watch('method', function (newVal) {
					scope.callback({
						method: newVal
					});

					// Reset current values for variables
					if (newVal && newVal.variables) {
						newVal.variables.forEach(function (variable) {
							variable.currentValue = variable['default'];
						});
					}
				});
			},
			scope: {
				callback: '&callback',
				label: '=label',
				methodList: '=generatorMethod'
			},
			templateUrl: 'method'
		};
	});

	module.directive('generatorDemo', function () {
		var i;
		i = 0;
		return {
			link: function (scope, element) {
				element.val(i);
				i += 1;
				scope.$watch('animations', function () {
                    console.log(scope.animations);
					element.val(i);
					i += 1;
				});
			},
			scope: {
				animations: '=generatorDemo'
			}
		};
	});
}());
