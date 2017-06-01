/* global angular */

"use strict";

angular.module("degreeConverter", []).directive("degreeConverter", () => {
    /**
     * Convert the string into a number.
     *
     * @param {string} v
     * @return {number}
     */
    function getDegreeValue(v) {
        var c, d, factor, good, i, oldC, sign, vv;

        vv = "";
        good = "0123456789.";
        sign = 1;
        factor = 1;
        d = 0;

        // Change non-numbers into spaces.
        oldC = " ";

        for (i = 0; i < v.length; i += 1) {
            c = v.charAt(i).toUpperCase();

            if (c === "W" || c === "S" || c === "-") {
                sign = -1;
            }

            // Convert commas to periods
            if (c === ",") {
                c = ".";
            }

            if (good.indexOf(c) < 0) {
                c = " ";
            }

            if (oldC !== " " || c !== " ") {
                vv += c;
                oldC = c;
            }
        }

        v = vv.split(" ");

        for (i = 0; i < v.length; i += 1) {
            d += v[i] * factor;
            factor /= 60;
        }

        return d * sign;
    }

    return {
        link($scope) {
            $scope.$watch("in", (newVal) => {
                var d, df, m, mf, sf;

                df = getDegreeValue(newVal);
                d = Math.floor(df);
                mf = (df - Math.floor(d)) * 60;
                m = Math.floor(mf);
                sf = (mf - Math.floor(m)) * 60;
                $scope.df = df;
                $scope.d = d;
                $scope.mf = mf;
                $scope.m = m;
                $scope.sf = sf;
            });
        }
    };
});
