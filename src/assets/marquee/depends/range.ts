"use strict";

export default function (min, max, callback) {
    const result = [];

    while (min <= max) {
        callback(min);
        result.push(min);
        min += 1;
    }

    return result;
};
