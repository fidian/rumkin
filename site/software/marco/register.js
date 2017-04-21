/* global angular */
"use strict";

angular.module("register", []).directive("register", () => {
    return {
        link: ($scope) => {
            /**
             * Calculates the registration code
             *
             * @param {string} newVal
             */
            function update(newVal) {
                var a, b, checksum, hex, i, key, regbytes;

                if (!newVal) {
                    $scope.errorCode = "EMPTY";

                    return;
                }

                newVal = newVal.toString().toUpperCase().replace(/[^A-F0-9]/g, "");
                newVal = newVal.toLowerCase();
                newVal = newVal.replace("o", "0");
                newVal = newVal.replace("i", "1");
                newVal = newVal.replace("l", "1");
                newVal = newVal.replace(/[^0-9a-f]/g, "");

                if (newVal.length === 0) {
                    $scope.errorCode = "EMPTY";

                    return;
                }

                if (newVal.length < 20) {
                    $scope.errorCode = "SHORT";

                    return;
                }

                if (newVal.length > 22) {
                    $scope.errorCode = "LONG";

                    return;
                }

                // Parse and break into numbers
                regbytes = [];
                hex = "0123456789abcdef";

                for (i = 0; i < 10; i += 1) {
                    regbytes[i] = hex.indexOf(newVal.charAt(i * 2)) * 16 + hex.indexOf(newVal.charAt(i * 2 + 1));
                }

                // Check for checksum errors
                checksum = 0;

                for (i = 0; i < 9; i += 1) {
                    checksum += regbytes[i];
                    checksum %= 256;
                }

                if (checksum !== regbytes[9]) {
                    $scope.errorCode = "CHECKSUM";

                    return;
                }

                key = 0;

                for (i = 0; i < 9; i += 1) {
                    /* eslint no-bitwise:off */
                    a = 21031 * regbytes[i] & 0xffff;
                    a = a + 24506 & 0xffff;
                    b = 40782 * i & 0xffff;
                    key = (key ^ a) + (b ^ 27795) & 0xFFFF;
                }

                key = key.toString();

                while (key.length < 5) {
                    key = `0${key}`;
                }

                $scope.errorCode = "";
                $scope.unlockCode = key;
            }

            $scope.code = "";
            update($scope.code);
            $scope.$watch("code", update);
        }
    };
});
