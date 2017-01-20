/**
 * JavaScript Marquee Generator
 * Copyright 2012 Tyler Akins
 * http://rumkin.com/license.html
 */
/*global window*/
(function () {
    'use strict';

    window.generator.depends.random = function (max) {
        return Math.floor(Math.random() * max);
    };
}());
