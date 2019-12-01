/* global angular, Uint32Array */

"use strict";

var polyfill;

polyfill = require("polyfill-crypto.getrandomvalues");

angular.module("random", []).factory("random", ($window) => {
    var crypto, getRandomValues, isNative, maxSafeInteger;

    /**
     * Returns a number from 0 to just under 1, just like Math.random().
     *
     * @return {number}
     */
    function decimal() {
        var array, result;

        result = maxSafeInteger;

        try {
            // Force a loop to happen so we can not return 1.
            while (result === maxSafeInteger) {
                array = new Uint32Array(2);
                getRandomValues(array);

                // Get 21 bits from the first array element
                // eslint-disable-next-line no-bitwise
                result = array[0] & 0x1fffff;

                // Move those bits higher
                result *= 0x100000000;

                // Get a further 32 bits from the second array element
                result += array[1];
            }

            return result / maxSafeInteger;
        } catch (e) {
            // Exception in crypto. Fallback to Math.random.
            return Math.random();
        }
    }


    /**
     * Returns a number from 0 to (max - 1). Make sure the `max`
     * parameter is AT MOST 2^53 otherwise this falls back to
     * Math.random() and you certainly won't get an even distribution
     * of values because they can't be represented in the floating
     * point number.
     *
     * @param {number} max
     * @param {number} [min=0]
     * @return {number}
     */
    function number(max) {
        var array, bits, i, mask, result;

        try {
            if (max > maxSafeInteger) {
                // This is not a big-number library.
                throw new Error();
            }

            // Determine how many bits are needed
            mask = 1;
            bits = 1;

            while (mask < max) {
                mask *= 2;
                mask += 1;
                bits += 1;
            }

            if (bits <= 32) {
                result = max;

                while (result >= max) {
                    array = new Uint32Array(1);
                    getRandomValues(array);

                    // eslint-disable-next-line no-bitwise
                    result = array[0] & mask;
                }

                return result;
            }

            // We'll use all of the low byte. Need to determine how
            // much of the upper byte to use.
            for (i = 0; i < 32; i += 1) {
                mask -= 1;
                mask /= 2;
                bits -= 1;
            }

            result = max;

            while (result >= max) {
                array = new Uint32Array(2);
                getRandomValues(array);

                // eslint-disable-next-line no-bitwise
                result = array[0] & mask;
                result *= 0x100000000;
                result += array[1];
            }

            return result;
        } catch (e) {
            // Exception in crypto. Fallback to Math.random.
            return Math.floor(Math.random() * max);
        }
    }

    crypto = $window.crypto || $window.msCrypto;

    if (crypto && crypto.getRandomValues && Uint32Array) {
        isNative = true;
        getRandomValues = (typedArray) => {
            return crypto.getRandomValues(typedArray);
        };
    } else {
        isNative = false;
        getRandomValues = polyfill;
    }

    // Floating points can store integers up to 2^53 safely.
    maxSafeInteger = Number.MAX_SAFE_INTEGER;

    return {
        decimal,
        isNative,
        number
    };
});