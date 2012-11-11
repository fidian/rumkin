/* Rainbow text generator
 * Copyright 2012 Tyler Akins
 * http://rumkin.com/license.html
 */
/*global $, util*/
$(function () {
	'use strict';

	function makeRainbow(text) {
		var $result, color, $span;

		$result = $('<b/>');

		function colorHex(i, mult) {
			var pi, sv, dec;
			pi = 3.141592653;
			sv = i / (text.length / pi);
			sv += mult * (pi / 3);
			dec = Math.sin(sv);
			return util.hexByte(dec * dec * 255);
		}

		util.each(text.split(''), function (val, i) {
			color = "#";
			color += colorHex(i, 1);
			color += colorHex(i, 0);
			color += colorHex(i, -1);

			$result.append($('<span/>').css('color', color).text(text.charAt(i)));
		});

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

