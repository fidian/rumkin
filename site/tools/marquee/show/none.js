/**
 * JavaScript Marquee Generator
 * Copyright 2012 Tyler Akins
 * http://rumkin.com/license.html
 */
/*global window*/
(function () {
    'use strict';

    window.generator.show.none = {
        title: "None",
        description: "Just shows the message.  Nothing fancy.",
        method: function (text, writer, whenDone) {
            if (writer(text)) {
                return;
            }

            whenDone();
        }
    };
}());
