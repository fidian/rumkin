/**
 * JavaScript Character Code
 * Copyright 2013 Tyler Akins
 * http://rumkin.com/license.html
 */
/*global angular*/
(function () {
    'use strict';

    angular.module('jsChars', ['autoGrow']).filter('jsChars', function () {
        return function (input) {
            if (input === undefined || input === '') {
                return '';
            }

            return input.split('').map(function (c) {
                var code, str;

                code = c.charCodeAt(0);
                str = '0000' + code.toString(16).toUpperCase();

                return str.substr(str.length - 4);
            }).join(' ');
        };
    });
}());

