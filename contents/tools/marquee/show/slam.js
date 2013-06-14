/**
 * JavaScript Marquee Generator
 * Copyright 2012 Tyler Akins
 * http://rumkin.com/license.html
 */
/*global window*/
(function () {
	'use strict';

	window.generator.show.slam = {
		title: "Slam",
		description: "Slams the letters, one by one, from the far right towards the left side.",
		variables: [
			{
				name: 'Delay',
				description: 'How long to wait between animations.',
				'default': 10
			}
		],
		method: function (text, writer, whenDone, delay) {
			var completed, current, queue, spaces;

			completed = '';
			spaces = '';
			current = '';

			function animate() {
				if (spaces === '') {
					completed += current;

					if (queue === '') {
						whenDone();
						return;
					}

					spaces = '                    ';  // 20 spaces
					current = text.charAt(0);
					queue = text.substr(1);
				} else {
					spaces = spaces.substr(1);
				}

				writer(completed + spaces + spaces + spaces + spaces + current);
				setTimeout(animate, delay);
			}

			animate();
		}
	};
}());
