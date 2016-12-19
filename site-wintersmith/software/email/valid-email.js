/*global angular, isValidEmail*/
angular.module('valid-email', []).directive('validEmail', function () {
    return {
        link: function ($scope) {
            $scope.email = 'test-me@example.com';
            $scope.$watch('email', function (newVal) {
                console.log(newVal, $scope.valid);
                $scope.valid = isValidEmail(newVal);
            });
        }
    };
});
