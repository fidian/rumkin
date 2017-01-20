/**
 * JavaScript Marquee Generator
 * Copyright 2012 Tyler Akins
 * http://rumkin.com/license.html
 */
/*global window*/
(function () {
    'use strict';

    window.generator.depends.repeat = function (what, howMany) {
        var i, result;

        i = 0;
        result = '';

        while (i < howMany) {
            result += what;
            i += 1;
        }

        return result;
    };
}());
