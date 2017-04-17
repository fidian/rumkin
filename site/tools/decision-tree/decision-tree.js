/* global angular */
"use strict";

angular.module("decisionTree", [
    "hc.marked"
]);

angular.module("decisionTree").config(($locationProvider) => {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});

angular.module("decisionTree").controller("decisionTreeController", ($scope, $location, $http) => {
    /**
     * Loads the JSON for a tree. If the tree is the same as the previous,
     * just reuse the existing tree.
     *
     * @param {string} name
     * @param {Object} previous
     * @param {Function} onLoad What to call if using AJAX to load data
     * @return {Object} tree
     */
    function loadTree(name, previous, onLoad) {
        var tree;

        // Sanitize
        name = name.replace(/[^-a-z0-9]/g, "");

        if (previous && previous.name === name) {
            return previous;
        }

        tree = {
            name,
            isLoading: true,
            title: ""
        };

        $http.get(`${name}.json`).then((response) => {
            tree.isLoading = false;
            tree.isLoaded = true;
            tree.data = response.data;
            tree.title = tree.data.title;
            onLoad();
            console.log(tree);
        }, (err) => {
            tree.isLoading = false;
            tree.isError = true;
            tree.error = err.data;
            tree.title = "Error loading tree";
        });

        return tree;
    }


    /**
     * Selects the question with the given ID. Returns that question so
     * it can be placed on $scope.
     *
     * @param {Object} tree
     * @param {string} id
     * @return {Object} node
     */
    function loadQuestion(tree, id) {
        if (!tree.data) {
            return {};
        }

        if (!id || !tree.data.tree[id]) {
            id = tree.data.start;
        }

        return tree.data.tree[id];
    }


    /**
     * When there's an update to the location, go load the tree and jump
     * to the right node.
     */
    function reconfigure() {
        var name;

        name = $location.search().tree;

        if (name) {
            $scope.tree = loadTree(name, $scope.tree, reconfigure);
            $scope.question = loadQuestion($scope.tree, $location.search().q);
        } else {
            $scope.tree = null;
            $scope.question = null;
        }
    }

    $scope.showTree = function (name) {
        $location.search("tree", name);
    };

    $scope.selectAnswer = function (answer) {
        $location.search("q", answer);
    };

    reconfigure();
    $scope.$on("$locationChangeSuccess", reconfigure);
});
