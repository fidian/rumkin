/*global $, levenshtein*/
$(function () {
	'use strict';

	var str1 = "", str2 = "";

	function update() {
		$('.levenshtein_demo .result').text(levenshtein(str1, str2));
	}

	$('.levenshtein_demo input.a').watchdog(function (val) {
		str1 = val;
		update();
	});
	$('.levenshtein_demo input.b').watchdog(function (val) {
		str2 = val;
		update();
	});
});
