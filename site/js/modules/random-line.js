"use strict";

/**
 * Select a random line from a text file and display it in the element.
 *
 * <span random-line="text-file.txt"></span>
 *
 * @license MIT with additional non-advertising clause
 * @see https://rumkin.com/license/
 */
/* global angular */
angular.module("randomLine", []).directive("randomLine", [
    "$http",
    function ($http) {
        return {
            link($scope, $element, $attrs) {
                $element.text("");

                $http.get($attrs.randomLine, {
                    cache: true
                }).then((response) => {
                    var index, list;

                    list = response.data.replace(/^[ \t\r\n]*|[ \t\r\n]$/g, "").split(/[\r\n]+/);
                    index = Math.floor(list.length * Math.random());
                    $element.text(list[index]);
                }, () => {
                    $element.text("Unable to retrieve list of lines");
                });
            }
        };
    }
]);
