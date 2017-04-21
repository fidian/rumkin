/* global angular, isValidEmail */
"use strict";

angular.module("valid-email", []).directive("validEmail", () => {
    return {
        link: ($scope) => {
            $scope.email = "test-me@example.com";
            $scope.$watch("email", (newVal) => {
                $scope.valid = isValidEmail(newVal);
            });
        }
    };
});
