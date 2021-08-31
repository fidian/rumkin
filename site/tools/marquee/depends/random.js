/**
 * JavaScript Marquee Generator
 * Copyright 2012 Tyler Akins
 * http://rumkin.com/license/
 */
/*global window*/
(function () {
    'use strict';
    window.generator.depends.range = function (min, max, callback) {
        var result;

        result = [];

        while (min <= max) {
            callback(min);
            result.push(min);
            min += 1;
        }

        return result;
    };
}());
