/**
 * JavaScript Marquee Generator
 * Copyright 2012 Tyler Akins
 * http://rumkin.com/license/
 */
/*global window*/
(function () {
    'use strict';

    window.generator.hide.explode = {
        title: "Explode",
        description: "With each frame it adds spaces between each character.  Makes the message appear to explode.",
        variables: [
            {
                name: 'Delay',
                description: 'How long to wait between animations.',
                'default': 10
            },
            {
                name: 'Max Spaces',
                description: 'How many spaces between letters at the end.',
                'default': 100
            }
        ],
        method: function (text, writer, whenDone, delay, spaces) {
            var letters, spacesString;

            function animate() {
                if (writer(letters.join(spacesString))) {
                    return;
                }

                if (spacesString.length < spaces) {
                    spacesString = spacesString + ' ';
                    setTimeout(animate, delay);
                } else {
                    if (writer('')) {
                        return;
                    }

                    whenDone();
                }
            }


            letters = text.split('');
            letters.unshift('');
            spacesString = '';
            animate();
        }
    };
}());
