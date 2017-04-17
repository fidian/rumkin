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
angular.module("randomLine", []).directive("randomLine", ($http) => {
    return {
        link($scope) {
            console.log($scope);
            $scope.line = "Error with URI.";
            $http.get($scope.uri, {
                cache: true
            }).then((response) => {
                var index, list;

                list = response.data.replace(/^[ \t\r\n]*|[ \t\r\n]$/g, "").split(/[\r\n]+/);
                index = Math.floor(list.length * Math.random());
                $scope.line = list[index];
            }, () => {
                $scope.line = "Unable to retrieve list.";
            });
            $scope.line = "";
        },
        scope: {
            uri: "=randomLine"
        },
        template: "{{line}}"
    };
});
