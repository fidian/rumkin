/**
 * Levenshtein string comparison function
 *
 * Web site:  http://rumkin.com/reference/algorithms/fuzzy_strings/
 * License:  http://rumkin.com/license.html
 */
function levenshtein(str1, str2) {
	'use strict';
	var i, j, diagonal, letter, cost, arr;

	if (str1.length * str2.length === 0) {
		return str1.length + str2.length;
	}

	arr = [];

	for (i = 0; i <= str1.length; i += 1) {
		// length + 1 array elements
		arr.push(i + 1);
	}

	for (i = 0; i < str2.length; i += 1) {
		diagonal = arr[0] - 1;
		arr[0] = i + 1;
		letter = str2.charAt(i);

		for (j = 0; j < str1.length; j += 1) {
			cost = diagonal;

			if (str1.charAt(j) !== letter) {
				cost += 1;
			}

			if (cost > arr[j]) {
				cost = arr[j];
			}

			if (cost > arr[j + 1]) {
				cost = arr[j + 1];
			}

			diagonal = arr[j + 1] - 1;
			arr[j + 1] = cost + 1;
		}
	}

	return arr.pop() - 1;
}
