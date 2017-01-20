// This is featured at StackOverflow
// http://stackoverflow.com/questions/19415394/with-ng-bind-html-unsafe-removed-how-do-i-inject-html
/*global angular*/
angular.module('trustedHtml', []).filter('trustedHtml', [
    '$sce',
    function ($sce) {
        return function (untrusted) {
            return $sce.trustAsHtml(untrusted);
        };
    }
]);
