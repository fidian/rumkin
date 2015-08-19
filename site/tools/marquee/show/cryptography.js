/**
 * JavaScript Marquee Generator
 * Copyright 2012 Tyler Akins
 * http://rumkin.com/license.html
 */
/*global window*/
(function () {
	'use strict';

	window.generator.show.cryptography = {
		title: "Cryptography",
		description: "The message is replaced with random letters.  They continue to change until they are the right letter for that position or until the maximum number of loops occur.  Always shows the right message at the end.  Similar to some \"hacking\" seen in movies.",
		variables: [
			{
				name: 'Delay',
				description: 'How long to wait between animations.',
				'default': 10
			},
			{
				name: 'Time Limit',
				description: 'Maximum amount of time to cycle.',
				'default': 3000
			}
		],
		depends: [ 'range', 'random' ],
		method: function (text, writer, whenDone, delay, timeLimit, range, random) {
			var chars, crypted;

			function solver() {
				var i, newCrypted;

				newCrypted = '';

				for (i = 0; i < text.length; i += 1) {
					if (text.charAt(i) !== crypted.charAt(i)) {
						newCrypted += chars.charAt(random(chars.length));
					} else {
						newCrypted += text.charAt(i);
					}
				}

				crypted = newCrypted;

				if (writer(crypted)) {
                    return;
                }

				if (crypted === text) {
					whenDone();
					return;
				}

				setTimeout(solver, delay);
			}

			chars = '';
			range(32, 128, function (num) {
				chars += String.fromCharCode(num);
			});
			crypted = '';
			writer(text);
			setTimeout(function () {
				crypted = text;
			}, timeLimit);
			solver();
		}
	};
}());
