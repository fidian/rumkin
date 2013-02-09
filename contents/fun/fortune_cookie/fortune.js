/*global $, fortunes*/
$(function () {
	'use strict';

	function showFortune() {
		// Pick a random one
		var i;
		i = Math.floor(fortunes.length * Math.random());
		$('.fortune_cookie span').text(fortunes[i]);
	}

	showFortune();
	$('a.another_fortune').click(function () {
		showFortune();
		return false;
	});
});
