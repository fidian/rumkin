/**
 * JavaScript Marquee Generator
 * Copyright 2012 Tyler Akins
 * http://rumkin.com/license.html
 */
/*global window*/
(function () {
    'use strict';

    window.generator.show.slideLeft = {
        title: "Slide Left",
        description: "Scrolls your text in from the right side.",
        variables: [
            {
                name: 'Delay',
                description: 'How long to wait between animations.',
                'default': 10
            },
            {
                name: 'Max Spaces',
                description: 'How many spaces should we start with.',
                'default': 100
            }
        ],
        depends: [ 'repeat' ],
        method: function (text, writer, whenDone, delay, spaces, repeat) {
            var spacesString;

            function animate() {
                if (writer(spacesString + text)) {
                    return;
                }

                if (spacesString.length) {
                    spacesString = spacesString.substr(1);
                    setTimeout(animate, delay);
                } else {
                    whenDone();
                }
            }

            spacesString = repeat(' ', spaces);
            animate();
        }
    };
}());
