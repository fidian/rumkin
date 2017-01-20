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
                function getAnimation(message, halfStep, methods) {
                    var args, fn, fnStr;

                    if (! message) {
                        message = "";
                    }

                    args = [
                        JSON.stringify(message),
                        "writeMethod",
                        "whenDone"
                    ];

                    if (halfStep.variables) {
                        halfStep.variables.forEach(function (v) {
                            // All arguments are numeric
                            args.push(+v.currentValue);
                        });
                    }

                    if (halfStep.depends) {
                        halfStep.depends.forEach(function (v) {
                            args.push("depends." + v);
                        });
                    }

                    fn = null;
                    fnStr = "fn = function (whenDone) {\n";
                    fnStr += "\tmethods[" + methods.indexOf(halfStep.method) + "](" + args.join(", ") + ");\n";
                    fnStr += "}";

                    /*jslint evil:true*/
                    eval(fnStr);
                    /*jslint evil:false*/

                    return fn;
                }

                function getDelay(delay) {
                    var fn;

                    fn = "fn = function (whenDone) {\n";
                    fn += "\tsetTimeout(whenDone, " + delay + ");\n";
                    fn += "}";

                    /*jslint evil:true*/
                    eval(fn);
                    /*jslint evil:false*/

                    return fn;
                }

                function getAnimations(animationList, methods) {
                    var animations;

                    animations = [];
                    animationList.forEach(function (step) {
                        animations.push(getAnimation(step.message, step.show, methods));
                        animations.push(getDelay(step.readDelay));
                        animations.push(getAnimation(step.message, step.hide, methods));
                        animations.push(getDelay(step.betweenDelay));
                    });

                    return animations;
                }

                function getDepends(animationList) {
                    var depends;

                    function checkDepends(animation) {
                        if (animation.depends) {
                            animation.depends.forEach(function (name) {
                                depends[name] = window.generator.depends[name];
                            });
                        }
                    }

                    depends = {};
                    animationList.forEach(function (step) {
                        checkDepends(step.show);
                        checkDepends(step.hide);
                    });

                    return depends;
                }

                function getMethods(animationList) {
                    var result;

                    function arrange(fn) {
                        if (result.indexOf(fn) === -1) {
                            result.push(fn);
                        }
                    }

                    result = [];

                    animationList.forEach(function (step) {
                        arrange(step.show.method);
                        arrange(step.hide.method);
                    });

                    return result;
                }

                function updateGeneratedCode() {
                    var animations, c, depends, methods, vars;

                    methods = getMethods(scope.animationList);
                    depends = getDepends(scope.animationList);
                    animations = getAnimations(scope.animationList, methods);

                    if (!scope.animationList.length || !scope.repeat || !scope.writeMethod) {
                        scope.generatedCode = '';

                        return;
                    }

                    // Header
                    c = [];
                    c.push("(function () {");
                    vars = [
                        'animations',
                        'writeMethod'
                    ];

                    if (Object.keys(depends).length) {
                        vars.push('depends');
                    }

                    vars.sort();
                    c.push("\tvar " + vars.join(", ") + ";");

                    // Writing method
                    switch (scope.writeMethod) {
                        case "window.status":
                            c.push("\twriteMethod = function (msg) {");
                            c.push("\t\twindow.status = msg;");
                            c.push("\t};");
                            break;

                        case "jQuery.text":
                            c.push("\twriteMethod = function (msg) {");
                            c.push("\t\t/*global $*/");
                            c.push("\t\t$(" + JSON.stringify(scope.writeMethodExtra || "") + ").text(msg);");
                            c.push("\t};");
                            break;

                        case "function":
                            c.push("\t/*global " + scope.writeMethodExtra + "*/");
                            c.push("\twriteMethod = " + scope.writeMethodExtra + ";");
                            break;
                    }

                    // Dependencies
                    if (Object.keys(depends).length) {
                        c.push("\tdepends = {}");
                        Object.keys(depends).forEach(function (name) {
                            c.push("\tdepends." + name + " = " + depends[name].toString() + ";");
                        });
                        c.push("\t};");
                    }

                    // Animation methods
                    methods = methods.map(function (fn) {
                        return fn.toString();
                    }).join(",\n");
                    c.push("\tmethods = [\n\t\t" + methods.replace(/\n/g, "\n\t\t") + "\t\n\t]");

                    // Animations
                    animations = animations.map(function (val) {
                        return val.toString();
                    }).join(",\n");
                    c.push("\tanimations = [\n\t\t" + animations.replace(/\n/g, "\n\t\t") + "\t\n\t];");

                    // Animator
                    c.push("\tfunction animateIt() {");
                    c.push("\t\tvar animateFn;");
                    c.push("\t\tanimateFn = animations.shift();");
                    c.push("\t\tif (animateFn) {");
                    c.push("\t\t\tanimateFn(animateIt);");

                    if (scope.repeat === "yes") {
                        c.push("\t\t\tanimations.push(animateFn);");
                    }

                    c.push("\t\t}");
                    c.push("\t}");

                    // Start the animator
                    c.push("\twindow.setTimeout(animateIt, 0);");

                    // Footer
                    c.push("}());");

                    // Combine to a single string
                    scope.generatedCode = c.join("\n").replace(/\t/g, "    ");
                }

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
                scope.readDelay = 1000;
                scope.betweenDelay = 500;
                scope.generatedCode = '';
                scope.$watch('betweenDelay', updatePreview);
                scope.$watch('readDelay', updatePreview);
                scope.$watch('message', updatePreview);
                scope.$watch('writeMethod', function () {
                    scope.writeMethodExtra = '';
                    updateGeneratedCode();
                });
                scope.$watchCollection('animationList', updateGeneratedCode);
                scope.$watch('repeat', updateGeneratedCode);
                scope.$watch('writeMethodExtra', updateGeneratedCode);
                scope.setHideMethod = function (method) {
                    scope.hideMethod = method;
                    updatePreview();
                };
                scope.setShowMethod = function (method) {
                    scope.showMethod = method;
                    updatePreview();
                };
                scope.addConfig = function (animationStep) {
                    scope.animationList.push(animationStep);
                };
            }
        };
    });

    module.directive('generatorMethod', function () {
        return {
            link: function (scope) {
                scope.sendUpdate = function () {
                    scope.callback({
                        method: scope.method
                    });
                };
                scope.$watch('method', function (newVal) {
                    // Reset current values for variables
                    if (newVal && newVal.variables) {
                        newVal.variables.forEach(function (variable) {
                            variable.currentValue = variable['default'];
                        });
                    }

                    scope.sendUpdate();
                });
                scope.method = scope.methodList.none;
            },
            scope: {
                callback: '&callback',
                label: '=label',
                methodList: '=generatorMethod',
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
                    newVal.forEach(function (step) {
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
