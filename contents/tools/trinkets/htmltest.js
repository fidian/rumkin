/*global $*/
$(function () {
	'use strict';

	var $output = $('.output');

	$('.input').autosize({append: "\n"}).watchdog(function (val) {
		$output.html(val);
	});
});

