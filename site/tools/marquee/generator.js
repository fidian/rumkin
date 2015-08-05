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
						preview.hide = scope.hideMethodList.none;
					}

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
		return {
			link: function (scope, element) {
                var preview;

                function generatePreview(target) {
                    var active, animateSteps, obj;

                    active = true;
                    animateSteps = [];
                    obj = {
                        abort: function () {
                            active = false;
                        },
                        addAnimation: function (message, animation) {
                            var args;

                            if (!message) {
                                message = "";
                            }

                            args = [
                                message,
                                obj.writer,
                                undefined
                            ];

                            if (animation.variables) {
                                animation.variables.forEach(function (v) {
                                    args.push(v.currentValue);
                                });
                            }

                            if (animation.depends) {
                                animation.depends.forEach(function (v) {
                                    args.push(window.generator.depends[v]);
                                });
                            }

                            animateSteps.push(function (whenDone) {
                                args[2] = whenDone;
                                animation.method.apply(null, args);
                            });
                        },
                        addDelay: function (ms) {
                            animateSteps.push(function (whenDone) {
                                setTimeout(whenDone, ms);
                            });
                        },
                        start: function () {
                            var fn;

                            if (!animateSteps.length) {
                                return;
                            }

                            fn = animateSteps.shift();
                            animateSteps.push(fn);
                            fn(function () {
                                setTimeout(obj.start, 0);
                            });
                        },
                        writer: function (message) {
                            if (!active) {
                                return 1;
                            }

                            target.val(message);
                        }
                    };

                    return obj;
                }

				scope.$watchCollection('animations', function (newVal) {
                    if (! angular.isArray(newVal)) {
                        element.val('');
                        return;
                    }

                    if (preview) {
                        preview.abort();
                    }

                    preview = generatePreview(element);
                    console.log(newVal);
                    newVal.forEach(function (step) {
                        console.log(step);
                        preview.addAnimation(step.message, step.show);
                        preview.addDelay(step.readDelay);
                        preview.addAnimation(step.message, step.hide);
                        preview.addDelay(step.betweenDelay);
                    });
                    preview.start();
				});
			},
			scope: {
				animations: '=generatorDemo'
			}
		};
	});
}());
