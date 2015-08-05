/**
 * JavaScript Marquee Generator
 * Copyright 2012 Tyler Akins
 * http://rumkin.com/license.html
 */
/*global window*/
(function () {
	'use strict';

	window.generator.hide.slideRight = {
		title: "Slide Right",
		description: "Scrolls your text out to the right side.",
		variables: [
			{
				name: 'Delay',
				description: 'How long to wait between animations.',
				'default': 10
			},
			{
				name: 'Max Spaces',
				description: 'How many spaces should we end with.',
				'default': 100
			}
		],
		method: function (text, writer, whenDone, delay, spaces) {
			var spacesString;

			function animate() {
				if (writer(spacesString + text)) {
                    return;
                }

				if (spacesString.length === spaces) {
					spacesString += ' ';
					setTimeout(animate, delay);
				} else {
					whenDone();
				}
			}

			spacesString = ' ';
			animate();
		}
	};
}());
