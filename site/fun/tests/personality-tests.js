/* global angular */
"use strict";

angular.module("personalityTests", [
    "hc.marked"
]);

angular.module("personalityTests").config(($locationProvider) => {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});

angular.module("personalityTests").controller("personalityTestsController", ($scope, $location, $http) => {
    /**
     * Loads a test data file.
     *
     * @param {string} name
     * @return {Object} test (filled in async later)
     */
    function loadTest(name) {
        var test;

        // Sanitize
        name = name.replace(/[^-a-z0-9]/g, "");
        test = {
            name,
            isLoading: true,
            title: ""
        };

        $http.get(`${name}.json`).then((response) => {
            test.isLoading = false;
            test.isLoaded = true;
            test.data = response.data;
            test.title = test.data.title;
            test.summary = test.data.summary;
            test.questions = test.data.questions;
        }, (err) => {
            test.isLoading = false;
            test.isError = true;
            test.error = err.data;
            test.title = "Error loading test";
        });

        return test;
    }


    /**
     * On location change, load any specified test.
     */
    function reconfigure() {
        var name;

        name = $location.search().test;

        if (name) {
            $scope.test = loadTest(name);
        } else {
            $scope.test = null;
        }
    }

    $scope.showTest = function (name) {
        $location.search("test", name);
    };

    reconfigure();
    $scope.$on("$locationChangeSuccess", reconfigure);
});
