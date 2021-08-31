/**
 * JavaScript Marquee Generator
 * Copyright 2012 Tyler Akins
 * http://rumkin.com/license/
 */
/*global window*/
(function () {
    'use strict';

    window.generator.hide.flyOff = {
        title: "Fly Off",
        description: "Makes the message have each letter fly away to the right side separately.",
        variables: [
            {
                name: 'Delay',
                description: 'How long to wait between animations.',
                'default': 10
            }
        ],
        method: function (text, writer, whenDone, delay) {
            var current, spaces;

            spaces = '                    ';  // 20 spaces
            current = '';

            function animate() {
                if (spaces.length === 20) {
                    if (text === '') {
                        if (writer('')) {
                            return;
                        }

                        whenDone();
                        return;
                    }

                    current = text.substr(-1);
                    text = text.substr(0, text.length - 1);
                    spaces = '';
                } else {
                    spaces += ' ';
                }

                if (writer(text + spaces + spaces + spaces + spaces + current)) {
                    return;
                }

                setTimeout(animate, delay);
            }

            animate();
        }
    };
}());
