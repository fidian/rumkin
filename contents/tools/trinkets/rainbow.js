/* Rainbow text generator
 * Copyright 2012 Tyler Akins
 * http://rumkin.com/license.html
 */
/*global $*/
$(function () {
	'use strict';

	var hx = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F' ];

	function convertToHex(x) {
		if (x < 0) {
			x += 255;
		}

		x = Math.floor(x);
		return hx[Math.floor(x / 16)] + hx[x % 16];
	}

	function makeRainbow(text) {
		var $result, i, color, $span;

		$result = $('<b/>');

		function colorHex(i, mult) {
			var pi, sv, dec;
			pi = 3.141592653;
			sv = i / (text.length / pi);
			sv += mult * (pi / 3);
			dec = Math.sin(sv);
			return convertToHex(dec * dec * 255);
		}

		for (i = 0; i < text.length; i += 1) {
			color = "#";
			color += colorHex(i, 1);
			color += colorHex(i, 0);
			color += colorHex(i, -1);

			console.log($('<span/>').css('color', color).text(text.charAt(i))[0].outerHTML);
			$result.append($('<span/>').css('color', color).text(text.charAt(i)));
		}

		return $result;
	}

	$(':submit').click(function () {
		var $result;

		$result = makeRainbow($('.input').val());
		$('.show').empty().append($result);
		$('.showHtml').text($result.html());
		return false;
	});
});

