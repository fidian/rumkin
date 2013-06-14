/**
 * JavaScript Marquee Generator
 * Copyright 2012 Tyler Akins
 * http://rumkin.com/license.html
 */
/*global window*/
(function () {
	'use strict';

	window.generator.hide.none = {
		title: "None",
		description: "Just removes the message.  Nothing fancy.",
		method: function (text, writer, whenDone) {
			writer('');
			whenDone();
		}
	};
}());
