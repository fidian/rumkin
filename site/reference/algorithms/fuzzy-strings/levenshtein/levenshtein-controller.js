/* global angular, levenshtein */
"use strict";

angular.module("levenshtein", []).controller("LevenshteinController", ($scope) => {
    /**
     * Recalculate the Levenshtein distance with the module.
     */
    function recalc() {
        $scope.result = levenshtein($scope.a, $scope.b);
    }

    $scope.a = "";
    $scope.b = "";
    recalc();

    $scope.$watch("a", recalc);
    $scope.$watch("b", recalc);
});
