/**
 * JavaScript Marquee Generator
 * Copyright 2012 Tyler Akins
 * http://rumkin.com/license/
 */
/* global angular, window */
"use strict";

var module;

window.generator = {
    depends: {},
    show: {},
    hide: {}
};

module = angular.module("generator", []);

module.directive("generator", () => {
    return {
        link: (scope) => {
            /**
             * Builds an animation function
             *
             * @param {string} message
             * @param {Object} halfStep Either a hide or a show definition
             * @param {Object} methods
             * @return {string}
             */
            function getAnimation(message, halfStep, methods) {
                var args, fn, fnStr;

                if (!message) {
                    message = "";
                }

                args = [
                    JSON.stringify(message),
                    "writeMethod",
                    "whenDone"
                ];

                if (halfStep.variables) {
                    halfStep.variables.forEach((v) => {
                        // All arguments are numeric
                        args.push(+v.currentValue);
                    });
                }

                if (halfStep.depends) {
                    halfStep.depends.forEach((v) => {
                        args.push(`depends.${v}`);
                    });
                }

                fn = null;
                fnStr = `fn = function (whenDone) {
\tmethods[${methods.indexOf(halfStep.method)}](${args.join(", ")});
}`;

                // eslint-disable-next-line no-eval
                eval(fnStr);

                return fn;
            }


            /**
             * Builds a delay function.
             *
             * @param {number} delay
             * @return {string}
             */
            function getDelay(delay) {
                var fn;

                fn = `fn = function (whenDone) {
\tsetTimeout(whenDone, ${delay});
}`;

                // eslint-disable-next-line no-eval
                eval(fn);

                return fn;
            }

            /**
             * Build an array of animation functions.
             *
             * @param {Array.<Object>} animationList of full steps
             * @param {Object} methods
             * @return {Array.<string>}
             */
            function getAnimations(animationList, methods) {
                var animations;

                animations = [];
                animationList.forEach((step) => {
                    animations.push(getAnimation(step.message, step.show, methods));
                    animations.push(getDelay(step.readDelay));
                    animations.push(getAnimation(step.message, step.hide, methods));
                    animations.push(getDelay(step.betweenDelay));
                });

                return animations;
            }


            /**
             * Get dependent functions when they are required.
             *
             * @param {Array.<Object>} animationList of full animations
             * @return {Object}
             */
            function getDepends(animationList) {
                var depends;

                /**
                 * If an animation is required, add it.
                 *
                 * @param {Object} animation
                 */
                function checkDepends(animation) {
                    if (animation.depends) {
                        animation.depends.forEach((name) => {
                            depends[name] = window.generator.depends[name];
                        });
                    }
                }

                depends = {};
                animationList.forEach((step) => {
                    checkDepends(step.show);
                    checkDepends(step.hide);
                });

                return depends;
            }

            /**
             * Build a list of methods for an animation
             *
             * @param {Array.<Object>} animationList of full steps
             * @return {Array.<Object>} animation methods
             */
            function getMethods(animationList) {
                var result;

                /**
                 * Only keep one copy of each method
                 *
                 * @param {Function} fn
                 */
                function arrange(fn) {
                    if (result.indexOf(fn) === -1) {
                        result.push(fn);
                    }
                }

                result = [];

                animationList.forEach((step) => {
                    arrange(step.show.method);
                    arrange(step.hide.method);
                });

                return result;
            }


            /**
             * Returns the writing method as a function string.
             *
             * @param {string} writeMethod
             * @return {string}
             */
            function getWriteMethod(writeMethod) {
                if (writeMethod === "window.status") {
                    return `\twriteMethod = function (msg) {
\t\twindow.status = msg;
\t};`;
                }

                if (writeMethod === "jQuery.text") {
                    return `\twriteMethod = function (msg) {
\t\t/*global $*/
\t\t$(${JSON.stringify(scope.writeMethodExtra || "")}).text(msg);
\t};`;
                }

                return `\t/*global ${scope.writeMethodExtra}*/
\twriteMethod = ${scope.writeMethodExtra};`;
            }


            /**
             * Uses scope and builds the necessary JavaScript.
             */
            function updateGeneratedCode() {
                var animations, c, depends, methods, vars;

                methods = getMethods(scope.animationList);
                depends = getDepends(scope.animationList);
                animations = getAnimations(scope.animationList, methods);

                if (!scope.animationList.length || !scope.repeat || !scope.writeMethod) {
                    scope.generatedCode = "";

                    return;
                }

                // Header
                c = [];
                c.push("(function () {");
                vars = [
                    "animations",
                    "writeMethod"
                ];

                if (Object.keys(depends).length) {
                    vars.push("depends");
                }

                vars.sort();
                c.push(`\tvar ${vars.join(", ")};`);
                c.push(getWriteMethod(scope.writeMethod));

                // Dependencies
                if (Object.keys(depends).length) {
                    c.push("\tdepends = {}");
                    Object.keys(depends).forEach((name) => {
                        c.push(`\tdepends.${name} = ${depends[name].toString()};`);
                    });
                    c.push("\t};");
                }

                // Animation methods
                methods = methods.map((fn) => {
                    return fn.toString();
                }).join(",\n");
                c.push(`\tmethods = [
\t\t${methods.replace(/\n/g, "\n\t\t")}
\t]`);

                // Animations
                animations = animations.map((val) => {
                    return val.toString();
                }).join(",\n");
                c.push(`\tanimations = [
\t\t${animations.replace(/\n/g, "\n\t\t")}
\t];`);

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


            /**
             * Updates the preview with the animation
             */
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
            scope.generatedCode = "";
            scope.$watch("betweenDelay", updatePreview);
            scope.$watch("readDelay", updatePreview);
            scope.$watch("message", updatePreview);
            scope.$watch("writeMethod", () => {
                scope.writeMethodExtra = "";
                updateGeneratedCode();
            });
            scope.$watchCollection("animationList", updateGeneratedCode);
            scope.$watch("repeat", updateGeneratedCode);
            scope.$watch("writeMethodExtra", updateGeneratedCode);
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

module.directive("generatorMethod", () => {
    return {
        link(scope) {
            scope.sendUpdate = () => {
                scope.callback({
                    method: scope.method
                });
            };
            scope.$watch("method", (newVal) => {
                // Reset current values for variables
                if (newVal && newVal.variables) {
                    newVal.variables.forEach((variable) => {
                        variable.currentValue = variable.default;
                    });
                }

                scope.sendUpdate();
            });
            scope.method = scope.methodList.none;
        },
        scope: {
            callback: "&callback",
            label: "=label",
            methodList: "=generatorMethod"
        },
        templateUrl: "method"
    };
});

module.directive("generatorDemo", () => {
    return {
        link(scope, element) {
            var preview;


            /**
             * Creates a preview in the target element.
             *
             * @param {angular~element} target
             * @return {Object}
             */
            function generatePreview(target) {
                var active, animateSteps, obj;

                active = true;
                animateSteps = [];
                obj = {
                    abort() {
                        active = false;
                    },
                    addAnimation(message, animation) {
                        var args;

                        if (!message) {
                            message = "";
                        }

                        args = [
                            message,
                            obj.writer,

                            // eslint-disable-next-line no-undefined
                            undefined
                        ];

                        if (animation.variables) {
                            animation.variables.forEach((v) => {
                                args.push(v.currentValue);
                            });
                        }

                        if (animation.depends) {
                            animation.depends.forEach((v) => {
                                args.push(window.generator.depends[v]);
                            });
                        }

                        animateSteps.push((whenDone) => {
                            args[2] = whenDone;
                            animation.method.apply(null, args);
                        });
                    },
                    addDelay(ms) {
                        animateSteps.push((whenDone) => {
                            setTimeout(whenDone, ms);
                        });
                    },
                    start() {
                        var fn;

                        if (!animateSteps.length) {
                            return;
                        }

                        fn = animateSteps.shift();
                        animateSteps.push(fn);
                        fn(() => {
                            setTimeout(obj.start, 0);
                        });
                    },
                    writer(message) {
                        if (!active) {
                            return 1;
                        }

                        target.val(message);

                        return 0;
                    }
                };

                return obj;
            }

            scope.$watchCollection("animations", (newVal) => {
                if (!angular.isArray(newVal)) {
                    element.val("");

                    return;
                }

                if (preview) {
                    preview.abort();
                }

                preview = generatePreview(element);
                newVal.forEach((step) => {
                    preview.addAnimation(step.message, step.show);
                    preview.addDelay(step.readDelay);
                    preview.addAnimation(step.message, step.hide);
                    preview.addDelay(step.betweenDelay);
                });
                preview.start();
            });
        },
        scope: {
            animations: "=generatorDemo"
        }
    };
});
