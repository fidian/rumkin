/* Found at https://gist.github.com/thomseddon/4703968
 * Adapted from: http://code.google.com/p/gaequery/source/browse/trunk/src/static/scripts/jquery.autogrow-textarea.js
 *
 * Works nicely with the following styles:
 * textarea {
 *    resize: none;
 *    transition: 0.05s;
 *    -moz-transition: 0.05s;
 *    -webkit-transition: 0.05s;
 *    -o-transition: 0.05s;
 * }
 *
 * Usage: <textarea auto-grow ng-model="something"></textarea>
 *
 * Requires ng-model attribute.
 */
/* global angular, document, getComputedStyle */
"use strict";

angular.module("autoGrow", []).directive("autoGrow", ($timeout) => {
    return ($scope, element, attr) => {
        var computedStyle, css, minHeight, paddingLeft, paddingRight, shadow;

        // Disable trimming of input
        if (element.attr("type") === "text" || element[0].nodeName === "TEXTAREA") {
            attr.$set("ngTrim", "false");
        }

        minHeight = element[0].offsetHeight;
        computedStyle = getComputedStyle(element[0]);
        paddingLeft = parseInt(computedStyle.paddingLeft || 0, 10);
        paddingRight = parseInt(computedStyle.paddingRight || 0, 10);
        css = {
            position: "absolute",
            top: 0,
            left: 0,
            width: `${element[0].offsetWidth - paddingLeft - paddingRight}px`,
            fontSize: computedStyle.fontSize,
            fontFamily: computedStyle.fontFamily,
            lineHeight: computedStyle.lineHeight,
            resize: "none",
            visibility: "hidden"
        };
        shadow = angular.element("<div></div>");
        $scope.$watch(attr.ngModel, (newValue) => {
            var val;

            /**
             * Repeat a string a given number of times
             *
             * @param {string} string
             * @param {number} number
             * @return {string}
             */
            function times(string, number) {
                var i, r;

                for (i = 0, r = ""; i < number; i += 1) {
                    r += string;
                }

                return r;
            }

            if (!newValue) {
                newValue = "";
            }

            if (!shadow) {
                return;
            }

            val = newValue.replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/&/g, "&amp;")
                .replace(/\n$/, "<br/>&nbsp;")
                .replace(/\n/g, "<br/>")
                .replace(/\s{2,}/g, (space) => {
                    return `${times("&nbsp;", space.length - 1)} `;
                });
            shadow.html(`${val}<br/>x`);
            $timeout(() => {
                element.css("height", `${Math.max(shadow[0].offsetHeight, minHeight)}px`);
            }, 1);
        });
        angular.element(document.body).append(shadow);
        shadow.css(css);

        $scope.$on("$destroy", () => {
            shadow.remove();
        });
        element.addClass("auto-grow");
    };
});
