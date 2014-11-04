/**
 * JavaScript Marquee Generator
 * Copyright 2012 Tyler Akins
 * http://rumkin.com/license.html
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
				description: 'How many spaces between letters at the beginning',
				'default': 100
			}
		],
		method: function (text, writer, whenDone, delay, spaces, repeat) {
			var letters, spacesString;

			function animate() {
				writer(letters.join(spacesString));

				if (spacesString.length) {
					spacesString = spacesString + ' ';
					setTimeout(animate, delay);
				} else {
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
