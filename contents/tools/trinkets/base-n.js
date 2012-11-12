/*global $*/
$(function () {
	'use strict';

	var $inBase = $('select[name="inbase"]'),
		$outBase = $('select[name="outbase"]'),
		$input = $('input[name="src"]'),
		$output = $('.output'),
		numList = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

	$('select.watch').each(function () {
		var $select = $(this),
			i,
			$option;
		console.log('asf');

		for (i = 2; i < 33; i += 1) {
			$option = $('<option/>').attr('value', i).text(i);

			if (i === 10) {
				$option.attr('selected', 'selected');
			}

			$select.append($option);
		}
	});

	$('.watch').watchdog(function () {
		var inBase = +$inBase.val(),
			outBase = +$outBase.val(),
			number = $input.val(),
			i,
			convertedNumber = 0,
			idx,
			s = '';

		// Convert the input number
		for (i = 0; i < number.length; i += 1) {
			idx = numList.indexOf(number.charAt(i));

			if (idx >= 0) {
				convertedNumber *= inBase;
				convertedNumber += idx;
			}
		}

		// Convert to the output number
		while (convertedNumber) {
			idx = convertedNumber % outBase;
			s = numList.charAt(idx) + s;
			convertedNumber -= idx;
			convertedNumber /= outBase;
		}

		if (s === '') {
			s = '0';
		}

		$output.text(s);
	});
});

