/**
 * JavaScript Marquee Generator
 * Copyright 2012 Tyler Akins
 * http://rumkin.com/license/
 */

"use strict";

module.exports = function(min, max, callback) {
    var result;

    result = [];

    while (min <= max) {
        callback(min);
        result.push(min);
        min += 1;
    }

    return result;
};
