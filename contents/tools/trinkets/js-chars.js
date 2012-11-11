/**
 * Javascript Character Code
 * Copyright 2012 Tyler Akins
 * http://rumkin.com/license.html
 */
/*global $, window, util*/
$(function () {
	'use strict';

	var $output = $('.output');

	$('.input').autosize({append: "\n"}).watchdog(function (s) {
		var c, i, o = "";

		for (i = 0; i < s.length; i += 1) {
			if (i) {
				o += ' ';
			}

			c = s.charCodeAt(i);
			o += util.hexByte(c / 256) + util.hexByte(c % 256);
		}

		$output.text(o);
	});
});

