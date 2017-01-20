/**
 * JavaScript Marquee Generator
 * Copyright 2012 Tyler Akins
 * http://rumkin.com/license.html
 */
/*global window*/
(function () {
    'use strict';

    window.generator.hide.slideLeft = {
        title: "Slide Left",
        description: "Scrolls your text out to the left side.",
        variables: [
            {
                name: 'Delay',
                description: 'How long to wait between animations.',
                'default': 10
            }
        ],
        method: function (text, writer, whenDone, delay) {
            var chars;

            function animate() {
                chars += 1;

                if (writer(text.substr(chars))) {
                    return;
                }

                if (chars < text.length) {
                    setTimeout(animate, delay);
                } else {
                    whenDone();
                }
            }

            chars = 0;
            animate();
        }
    };
}());
