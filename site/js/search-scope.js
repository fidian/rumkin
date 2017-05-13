/*global angular*/
angular.module('searchScope', []).config([
    '$locationProvider',
    function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
]).controller('searchScope', [
    '$scope',
    '$location',
    function ($scope, $location) {
        $scope.search = $location.search();
    }
]).directive('searchScope', [
    '$location',
    function ($location) {
        return {
            link: function ($scope) {
                $scope.search = $location.search();
            }
        };
    }
]);
