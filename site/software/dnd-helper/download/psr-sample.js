/*global angular, Psr*/
angular.module('psr-sample', []).directive('psrSample', [
    '$http',
    function ($http) {
        return {
            link: function ($scope, $element, $attrs) {
                /*jslint unparam:true*/
                $scope.loading = true;
                $scope.show = false;
                $scope.url = $attrs.psrSample;

                function generate() {
                    if ($scope.loading || $scope.error) {
                        return;
                    }

                    $scope.sample = $scope.psr.generate();
                }

                $scope.$watch('show', function (newVal) {
                    if (newVal) {
                        $scope.loading = true;
                        $scope.error = false;
                        $http.get($scope.url).then(function (response) {
                            $scope.loading = false;
                            $scope.psr = new Psr(response.data);
                            generate();
                        }, function (err) {
                            $scope.loading = false;
                            $scope.error = err;
                        });
                    }
                });
                $scope.generate = generate;
            },
            scope: {},
            templateUrl: "psr-sample.html"
        };
    }
]);
