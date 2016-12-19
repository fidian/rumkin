/*global angular*/

angular.module('decisionTree', [
    'hc.marked'
]);

angular.module('decisionTree').config([
    '$locationProvider',
    function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
]);

angular.module('decisionTree').controller('decisionTreeController', [
    '$scope',
    '$location',
    '$http',
    '$q',
    function ($scope, $location, $http, $q) {
        function loadTree(name, previous) {
            var deferred, tree;

            deferred = $q.defer();

            // Sanitize
            name = name.replace(/[^\-a-z0-9]/g, '');

            if (previous && previous.name === name) {
                deferred.resolve(previous);
            } else {
                tree = {
                    name: name,
                    isLoading: true,
                    title: ''
                };

                $http.get(name + '.js').then(function (response) {
                    tree.isLoading = false;
                    tree.isLoaded = true;
                    tree.data = response.data;
                    tree.title = tree.data.title;
                    deferred.resolve(tree);
                }, function (err) {
                    tree.isLoading = false;
                    tree.isError = true;
                    tree.error = err.data;
                    tree.title = 'Error loading tree';
                    deferred.resolve(tree);
                });
            }

            return deferred.promise;
        }

        function loadQuestion(tree, id) {
            if (! id || ! tree.data.tree[id]) {
                id = tree.data.start;
            }

            return tree.data.tree[id];
        }

        function reconfigure() {
            var name;

            name = $location.search().tree;

            if (name) {
                loadTree(name, $scope.tree).then(function (tree) {
                    $scope.tree = tree;
                    $scope.question = loadQuestion($scope.tree, $location.search().q);
                });
            } else {
                $scope.tree = null;
                $scope.question = null;
            }
        }

        $scope.showTree = function (name) {
            $location.search('tree', name);
        };

        $scope.selectAnswer = function (answer) {
            $location.search('q', answer);
        };

        reconfigure();
        $scope.$on('$locationChangeSuccess', reconfigure);
    }
]);
