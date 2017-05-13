/* global angular */
"use strict";

angular.module("compression", [
    "autoGrow"
]).directive("compression", ($parse, $window) => {
    var compression;

    compression = $window.rumkinCompression;

    return {
        link: ($scope, element, $attr) => {
            var algorithmGroup, cancel, method;


            /**
             * Wrap the result in some sort of function call.
             *
             * @param {(Buffer|string)} data
             * @return {string}
             */
            function feedToFunction(data) {
                var result;

                result = `((${algorithmGroup.decompressTiny.toString()})\n(`;

                if (!$scope.ascii) {
                    result += "Buffer.from(";
                }

                while (data.length > 60) {
                    result += `${JSON.stringify(data.substr(0, 60))}+\n`;
                    data = data.substr(60);
                }

                result += JSON.stringify(data);

                if (!$scope.ascii) {
                    result += ", \"base64\")";
                }

                result += "))";

                return result;
            }


            /**
             * When compression is done, convert the result so it can
             * be displayed on the webpage.
             *
             * @param {Error} [err]
             * @param {(Buffer|string)} result
             */
            function compressDone(err, result) {
                if (err) {
                    result = err.toString();

                    return;
                }

                if (!$scope.ascii) {
                    result = result.toString("base64");
                }

                if ($scope.includeJs) {
                    result = feedToFunction(result);
                }

                $scope.$apply(() => {
                    $scope.working = false;
                    $scope.result = result;
                });
            }

            /**
             * Compresses the text. Uses variables from $scope as input and
             * output.
             */
            function recompress() {
                var input;

                cancel();
                input = $scope.text;

                if (input.length === 0) {
                    $scope.result = "";

                    return;
                }

                if (!$scope.ascii) {
                    input = Buffer.from(input);
                }

                $scope.working = true;
                cancel = algorithmGroup.compress(input, compressDone);
            }


            // Initialize scope
            $scope.ascii = false;
            $scope.includeJs = false;
            $scope.text = "";
            $scope.result = "";

            // Initialize variables
            method = $parse($attr.method)();
            algorithmGroup = compression[method];
            cancel = () => {};

            // Watches
            $scope.$watch("ascii", (newVal) => {
                if (newVal) {
                    algorithmGroup = compression[`${method}Ascii`];
                } else {
                    algorithmGroup = compression[method];
                }

                recompress();
            });
            $scope.$watch("text", recompress);
            $scope.$watch("includeJs", recompress);
            $scope.$watch("result", (result) => {
                $scope.originalLength = $scope.text.length;
                $scope.compressedLength = result.length;
                $scope.savings = $scope.originalLength - $scope.compressedLength;
                $scope.savingsAbs = Math.abs($scope.savings);
                $scope.percentOfOriginal = $scope.compressedLength / ($scope.originalLength || 1);
            });
        },
        scope: true
    };
}).directive("base64", () => {
    return {
        link($scope) {
            $scope.$watch("base64", (newVal) => {
                $scope.encoded = Buffer.from(newVal, "utf8").toString("base64");
            });
        },
        scope: {
            base64: "="
        },
        template: "{{encoded}}"
    };
});
