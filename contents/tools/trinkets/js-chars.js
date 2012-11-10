/**
 * Javascript Character Code
 * Copyright 2012 Tyler Akins
 * http://rumkin.com/license.html
 */
/*global $, window*/
$(function () {
	'use strict';

	var last = -1,
		$input = $('#input'),
		$output = $('#output');

	function dumpChars(s) {
		var c, i, o = "", Hex = "0123456789ABCDEF";

		for (i = 0; i < s.length; i += 1) {
			c = s.charCodeAt(i);
			/*jslint bitwise: true*/
			o += Hex.charAt((c >> 12) & 0x0F) + Hex.charAt((c >> 8) & 0x0F) + Hex.charAt((c >> 4) & 0x0F) + Hex.charAt(c & 0x0F) + " ";
			/*jslint bitwise: false*/
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

