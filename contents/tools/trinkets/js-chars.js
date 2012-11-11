/**
 * Javascript Character Code
 * Copyright 2012 Tyler Akins
 * http://rumkin.com/license.html
 */
/*global $, window, util*/
$(function () {
	'use strict';

	var last = -1,
		$input = $('#input'),
		$output = $('#output');

	function dumpChars(s) {
		var c, i, o = "";

		for (i = 0; i < s.length; i += 1) {
			c = s.charCodeAt(i);
			o += util.hexByte(c / 256) + util.hexByte(c % 256);
		}

		return o;
	}

	function update() {
		var current = $input.val();

		if (current !== last) {
			$output.text(dumpChars(current));
			last = current;
		}

		window.setTimeout(update, 100);
	}

	update();
});

