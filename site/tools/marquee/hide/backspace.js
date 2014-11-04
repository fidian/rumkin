/**
 * JavaScript Marquee Generator
 * Copyright 2012 Tyler Akins
 * http://rumkin.com/license.html
 */
/*global window*/
(function () {
	'use strict';

	window.generator.hide.backspace = {
		title: "Backspace",
		description: "Letters are removed with the a delay between each character.",
		variables: [
			{
				name: 'Delay',
				description: 'How long to wait between animations.',
				'default': 800
			},
			{
				name: 'Plus Or Minus',
				description: 'The delay can be off by this much to look like a real person is typing.',
				'default': 350
			}
		],
		depends: ['random'],
		method: function (text, writer, whenDone, delay, error, random) {
			var complete, min, max, range;

			function animate() {
				text = text.substr(0, -1);
				writer(text);

				if (text.length === 0) {
					whenDone();
				} else {
					setTimeout(animate, random(range) + min);
				}
			}

			min = delay - error;
			max = delay + error;

			if (min < 0) {
				min = 0;
			}

			range = max - min;
			animate();
		}
	};
}());
